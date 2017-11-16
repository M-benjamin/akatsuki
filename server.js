const express = require('express');
const app = express();
const path = require('path');
const port = process.argv[2] || 8080;
const bodyParser = require('body-parser');

//use database
const db = require('./database/init');

//set the rending engine
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

//configuration of routers
const index = require('./routes/index');

//for configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//call the index page
app.use('/', index);


app.use((req, res, next) => {
    let err = new Error('Not found');

});

//start server
db.sequelize.sync().then(() => {
    console.log("Database config success!");

    app.listen(port, (err) => {
        console.log(`Server is running on port ${port}`);
    });

}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
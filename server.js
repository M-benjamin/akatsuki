const express = require('express');
const app = express();
const path = require('path');
const port = process.argv[2] || 8000;
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');

//use database
const db = require('./database/init');

//set the rending engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//for configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookie());
app.use(session({ secret: 'ben' }));


//configuration of routers
const index = require('./routes/index');
const profil = require('./routes/profil');

//call the index page
app.use('/', index);
app.use('/profil', profil);

// app.use((req, res, next) => {
//     let err = new Error('Not found');
//     next();
// });

//start server
db.sequelize.sync().then(() => {
    console.log("Database config success!");

    app.listen(port, (err) => {
        console.log(`Server is running on port ${port}`);
    });

}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
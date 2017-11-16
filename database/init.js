const Sequilize = require('sequelize');
const path = require('path');
const fs = require('fs');

let db = {};

//configuration of my database
db.Sequilize = new Sequilize('akatsuki', 'efrei-paris', '', {
    host: 'localhost',
    dialect: 'postgres'
});

let model_pathname = path.join(__dirname, 'models');

fs.readdirSync(model_pathname)
    .filter((filename) => {
        return (filename.indexOf(".") !== 0);
    })
    .forEach((filename) => {
        let model = db.Sequilize.import(path.join(model_pathname, filename));
        db[model.name] = model;
    });

module.exports = db;
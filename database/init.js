const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

let db = {};

const config = require(path.join(__dirname, 'config.json'));

//configuration of my database
db.sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

let model_pathname = path.join(__dirname, 'models');

fs.readdirSync(model_pathname)
    .filter((filename) => {
        return (filename.indexOf(".") !== 0);
    })
    .forEach((filename) => {
        let model = db.sequelize.import(path.join(model_pathname, filename));
        db[model.name] = model;
    });

module.exports = db;
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    let modules = sequelize.define('modules', {
        name: {
            type: DataTypes.STRING,
            require: true
        },
        teacher: {
            type: DataTypes.STRING,
            require: true
        },

    })
    return modules;
};
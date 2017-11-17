const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    let users = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            require: true
        },
        firstname: {
            type: DataTypes.STRING,
            require: true
        },
        lastname: {
            type: DataTypes.STRING,
            require: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_confirm: {
            type: DataTypes.VIRTUAL
        },
    }, {
        //for manage my request
        hooks: {
            //trigger: before add the password to datadase encript it
            beforeCreate: function(user) {
                if (user.password != user.password_confirm) {
                    throw ("Error passwords doesn't match!");
                }

                let salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });

    //add method for loggin compare password from db and from form input
    users.prototype.checkPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

    return users;
};
module.exports = (sequelize, DataTypes) => {

    let users = sequelize.define('user', {
        username: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        birthdate: DataTypes.DATE
    });

    return users;
};
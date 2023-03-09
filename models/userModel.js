//require
const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')

//table
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        require: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_role: {
        type: DataTypes.ENUM('admin', 'seller', 'customer'),
        defaultValue: "customer",
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        require: false
    },
}, { tableName: 'users' })

//relation
User.associate = function (models) {
    User.hasMany(models.AuthToken);

}

//sync
sequelize.sync(
    { force: false })
    .then(() => { console.log('yes re-sync done in user model!') }
    )

//exports
module.exports = User
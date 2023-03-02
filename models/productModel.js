
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
//create a sequelize model for Category
const User = require('./userModel')
const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING,
        require: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT
    },
    published: {
        type: DataTypes.BOOLEAN
    },
    ownerId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        referencesKey: 'id'
    },
}, {
    tableName: 'products'
});
sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done in product model!')
    })


module.exports = Product;

//require
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = require('./userModel')
const { Product } = require('./productModel')

//table
const Cart = sequelize.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        referencesKey: 'id'
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        },
        referencesKey: 'id'
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, { timestamps: true })


sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done in cart model!')
    })

module.exports = Cart;

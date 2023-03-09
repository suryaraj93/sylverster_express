
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
//create a sequelize model for Category
const User = require('./userModel')
const { Product } = require('./productModel');
const Cart = require('./cartModel');


const Order = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        },
        referencesKey: 'id'
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        referencesKey: 'id'
    },
    cartId: {
        type: DataTypes.INTEGER,
        references: {
            model: Cart,
            key: 'id'
        },
        referencesKey: 'id'
    },

}, {
    timestamps: true,
    tableName: 'orders'
})

sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done in order model!')
    })


module.exports =  Order ;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
//create a sequelize model for Category
const User = require('./userModel')

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
})


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
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        },
        referencesKey: 'id'
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


module.exports = {Product,Category};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
//create a sequelize model for Review
const {Product} = require('./productModel')
const Review = sequelize.define('review', {
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
    rating: { type: DataTypes.INTEGER },
    description: {
        type: DataTypes.TEXT
    },

}, {
    tableName: 'review'
});
Product.hasMany(Review, {
    as: 'review',
    foreignKey: "productId"
})
sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done in review model!')
    })



module.exports = Review;

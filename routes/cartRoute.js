//imports
const cartController = require('../controllers/cartController')
const cartRouter = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')

//cart urls
cartRouter.get('/cart-items', verifyToken, cartController.getCart)
cartRouter.post('/add-cart', verifyToken, cartController.addToCart)
cartRouter.post('/remove-cart', verifyToken, cartController.removeFromCart)
cartRouter.put('/add-quantity', verifyToken, cartController.addQuantity)
cartRouter.put('/reduce-quantity', verifyToken, cartController.reduceQuantity)

//exports
module.exports = cartRouter
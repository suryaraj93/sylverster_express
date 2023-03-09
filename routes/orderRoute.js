//imports
const orderController = require('../controllers/orderController')
const orderRouter = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')

//cart urls
orderRouter.get('/order-list', verifyToken, orderController.getAllOrders)
orderRouter.post('/create-order', verifyToken, orderController.createOrder)

//exports
module.exports = orderRouter
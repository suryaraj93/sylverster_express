const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')

const getAllOrders = async (req, res) => {
    let orders = await Order.findAll({})
    if (orders) {
        res.status(200).send(orders)
    }
    else {
        res.status(200).send({})
    }
}

const createOrder = async (req, res) => {
    let { cartId } = req.body
    console.log(cartId)
    try {
        const cart = await Cart.findOne({ where: { id: cartId } })
        if (!cart) {
            res.status(400).send("cart not found")
        } else {
            let order = await Order.create({ productId: cart.productId, userId: req.user.id, cartId })
            res.status(200).send(order)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error })
    }
}

module.exports = {
    getAllOrders,
    createOrder
}

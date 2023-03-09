const Cart = require('../models/cartModel')
const { Product } = require('../models/productModel')

const getCart = async (req, res) => {
    let reviews = await Cart.findAll({})
    if (reviews) {
        res.status(200).send(reviews)
    }
    else {
        res.status(200).send({})
    }
}


const addToCart = async (req, res) => {
    try {
        let { productId, quantity = 1 } = req.body
        const product_exists = await Product.findOne({ where: { id: productId } })
        const product_already_in_cart = await Cart.findOne({ where: { productId: productId } })
        if (product_already_in_cart) {
            product_already_in_cart.quantity += quantity
            await product_already_in_cart.save()
            res.status(200).send({ product_already_in_cart, message: 'quantity added' })
        }
        else if (product_exists) {
            let data = {
                userId: req.user.id,
                productId: productId,
                quantity: quantity
            }
            const cart = await Cart.create(data)
            console.log('cart', cart)
            res.status(200).send({ cart })
        }
        else {
            res.status(404).send({ message: 'Product not found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error })
    }
}


const removeFromCart = async (req, res) => {
    try {
        let { productId } = req.body
        const product_already_in_cart = await Cart.findOne({ where: { productId: productId } })
        if (product_already_in_cart) {
            await product_already_in_cart.destroy()
            res.status(200).send({ message: 'Product deleted' })
        }
        else {
            res.status(404).send({ message: 'Product not found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error })
    }
}

const addQuantity = async (req, res) => {
    try {
        let { cartId } = req.body
        console.log(cartId)
        const cart_exists = await Cart.findOne({ where: { id: cartId } })
        console.log(cart_exists);
        if (cart_exists && cart_exists.quantity <= 0) {
            cart_exists.quantity++
            await cart_exists.save()
            res.status(200).send({ cart_exists })
        } else {
            res.status(500).send({ message: "card id don't exist" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error })
    }
}

const reduceQuantity = async (req, res) => {
    try {
        let { cartId } = req.body
        const cart_exists = await Cart.findOne({ where: { id: cartId } })
        if (cart_exists && cart_exists.quantity != 1 && cart_exists.quantity >= 0) {
            cart_exists.quantity--
            await cart_exists.save()
            res.status(200).send({ cart_exists })
        }
        else if (cart_exists.quantity == 1) {
            res.status(500).send({ message: "can't reduce quantity" })
        } else {
            res.status(500).send({ message: "card id don't exist" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error })
    }
}


module.exports = {
    getCart, addToCart,
    removeFromCart,
    addQuantity,
    reduceQuantity
}

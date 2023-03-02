const Product = require('../models/productModel')
const { transporter } = require("../middlewares/sendMail")
const { mailData } = require("../middlewares/sendMail")

//main model

const addProduct = async (req, res) => {
    let imageUrl = req.file?.path ?? ""

    let info = {
        title: req.body.title,
        image: imageUrl,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        ownerId: req.user.id
    }

    const product = await Product.create(info)
    let mail_data = mailData(req.user.email)
    transporter.sendMail(mail_data, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    res.status(200).send(product)

}

const getAllProducts = async (req, res) => {
    let products = await Product.findAll({
        where: {
            ownerId: req.user.id
        }
    })

    if (products) {
        res.status(200).send(products)
    }
    else {
        res.status(200).send({})
    }
}
const getSingleProduct = async (req, res) => {
    let id = req.params.id
    let product = await Product.findOne({ where: { id } })
    res.status(200).send(product)
}

const updateProduct = async (req, res) => {
    let id = req.params.id
    let user_id = req.user.id
    let imageUrl = req.file?.path ?? ""
    let product_id = await Product.findOne({ where: { id: id } })

    if (!product_id) {
        res.status(404).send({ message: "product not found" })
    }
    let users_product = await Product.findOne({ where: { ownerId: user_id } })
    if (!users_product) {
        res.status(404).send({ message: "no permission to edit" })
    }
    let product = await Product.findOne({ where: { id: id, ownerId: user_id } })
    if (!product) {
        res.status(404).send({ message: "product not found" })
    }
    else {
        req.body.image = imageUrl
        let product = await Product.update(req.body, { where: { id: id, ownerId: req.user.id } })
        res.status(200).send(product)
    }
}

const deleteProduct = async (req, res) => {
    let id = req.params.id
    let product = await Product.findOne({ where: { id: id, ownerId: req.user.id } })
    if (!product) {
        res.status(404).send({ message: "product not found" })
    }
    else {
        await Product.destroy({ where: { id: id, ownerId: req.user.id } })
        res.status(200).send({ message: 'product is deleted' })
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
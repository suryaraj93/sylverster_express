//imports
const { Product } = require('../models/productModel')
const { Category } = require('../models/productModel')
const { transporter } = require("../middlewares/sendMail")
const { mailData } = require("../middlewares/sendMail")


const addProduct = async (req, res) => {
    try {
        await Category.findOne({ where: { id: req.body.category } })
    }
    catch {
        res.status(404).send({ message: "category not found" })
    }
    if (req.user.user_role == 'customer') {
        res.status(404).send({ message: "customer can't create products" })
    }
    else {
        let imageUrl = req.file?.path ?? ""
        let info = {
            categoryId: req.body.category,
            title: req.body.title,
            image: imageUrl,
            price: req.body.price,
            description: req.body.description,
            published: req.body.published ? req.body.published : false,
            ownerId: req.user.id
        }

        const product = await Product.create(info)
        let mail_data = mailData(req.user.email, req.body.title)
        transporter.sendMail(mail_data, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        res.status(200).send(product)

    }
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

const getAllPublishedProducts = async (req, res) => {
    let products = await Product.findAll({
        where: {
            ownerId: req.user.id, published: true
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
    if (req.user.user_role == 'customer') {
        res.status(404).send({ message: "customer can't update products" })
    }
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


const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({})
        console.log('categories', categories);
        if (categories) {
            res.status(200).send(categories)
        }
    } catch {
        res.status(200).send({})
    }
}

const addCategory = async (req, res) => {
    if (req.user.user_role == 'customer') {
        res.status(404).send({ message: "customer can't create products" })
    }
    else {
        let info = {
            categoryName: req.body.categoryName,
        }
        const category = await Category.create(info)
        res.status(200).send(category)

    }
}

const getSingleCategory = async (req, res) => {
    let id = req.params.category_id
    let category = await Category.findOne({ where: { id } })
    res.status(200).send(category)
}

const updateCategory = async (req, res) => {
    if (req.user.user_role == 'customer') {
        res.status(404).send({ message: "customer can't update products" })
    }
    let id = req.params.category_id

    let category_id = await Category.findOne({ where: { id: id } })
    console.log('category_id', category_id)
    if (!category_id) {
        res.status(404).send({ message: "product not found" })
    }
    else {
        console.log('req.body', req.body);
        let category = await category_id.update(req.body)
        res.status(200).send(category)
    }
}

const deleteCategory = async (req, res) => {
    let id = req.params.category_id
    let category = await Category.findOne({ where: { id: id } })
    if (!category) {
        res.status(404).send({ message: "Category not found" })
    }
    else {
        await Category.destroy({ where: { id: id } })
        res.status(200).send({ message: 'Category is deleted' })
    }
}


//exports
module.exports = {
    //category
    getAllCategory,
    addCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,

    //products
    getAllProducts,
    getAllPublishedProducts,
    addProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct


}
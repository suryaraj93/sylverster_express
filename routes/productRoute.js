

const productController = require('../controllers/productController')
const verifyToken = require('../middlewares/verifyToken')
const productRouter = require('express').Router()
const fileStorage = require('../middlewares/fileUpload')


productRouter.post('/addProduct', verifyToken, fileStorage.single('image'), productController.addProduct)
productRouter.get('/productList', verifyToken, productController.getAllProducts)
productRouter.get('/:id', verifyToken, productController.getSingleProduct)
productRouter.put('/:id', verifyToken,fileStorage.single('image'), productController.updateProduct)
productRouter.delete('/:id', verifyToken, productController.deleteProduct)



module.exports = productRouter
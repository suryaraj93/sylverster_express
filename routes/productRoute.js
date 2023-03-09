
//imports
const productController = require('../controllers/productController')
const { verifyToken, permitAdminOnly } = require('../middlewares/verifyToken')
const productRouter = require('express').Router()
const fileStorage = require('../middlewares/fileUpload')


//category urls
productRouter.get('/category-list', verifyToken, permitAdminOnly, productController.getAllCategory)
productRouter.post('/add-category', verifyToken, productController.addCategory)
productRouter.get('/:category_id', verifyToken, productController.getSingleCategory)
productRouter.put('/:category_id', verifyToken, productController.updateCategory)
productRouter.delete('/:category_id', verifyToken, productController.deleteProduct)


//product url
productRouter.post('/add-product', verifyToken, fileStorage.single('image'), productController.addProduct)
productRouter.get('/product-list', verifyToken, permitAdminOnly, productController.getAllProducts)
productRouter.get('/published-product-list', verifyToken, productController.getAllPublishedProducts)
productRouter.get('/:id', verifyToken, productController.getSingleProduct)
productRouter.put('/:id', verifyToken, fileStorage.single('image'), productController.updateProduct)
productRouter.delete('/:id', verifyToken, productController.deleteProduct)


//exports
module.exports = productRouter





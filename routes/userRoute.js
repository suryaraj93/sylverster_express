//imports
const userController = require('../controllers/userController')
const { verifyToken, permitAdminOnly } = require('../middlewares/verifyToken')
const userRouter = require('express').Router()
const fileStorage = require('../middlewares/fileUpload')

//user urls
userRouter.get('/user-list', verifyToken, permitAdminOnly, userController.getAllUsers)
userRouter.post('/create-user', fileStorage.single('image'), userController.createUser)
userRouter.post('/sign-in', userController.signIn)

//exports
module.exports = userRouter
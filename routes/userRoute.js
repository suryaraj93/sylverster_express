const userController = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const userRouter = require('express').Router()

userRouter.get('/userList', verifyToken, userController.getAllUsers)
userRouter.post('/createUser', userController.createUser)
userRouter.post('/signIn', userController.signIn)

module.exports = userRouter
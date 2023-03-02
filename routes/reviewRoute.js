const reviewController = require('../controllers/reviewController')
const reviewRouter = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
reviewRouter.get('/reviewList', verifyToken, reviewController.getAllReviews)
reviewRouter.get('/:id', verifyToken, reviewController.singleReview)
reviewRouter.post('/addReview', verifyToken, reviewController.addReview)
reviewRouter.put('/updateReview', verifyToken, reviewController.updateReview)
reviewRouter.delete('/deleteReview', verifyToken, reviewController.deleteReview)

module.exports = reviewRouter
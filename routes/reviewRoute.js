//imports
const reviewController = require('../controllers/reviewController')
const reviewRouter = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')

//review url
reviewRouter.get('/review-list', verifyToken, reviewController.getAllReviews)
reviewRouter.get('/:id', verifyToken, reviewController.singleReview)
reviewRouter.post('/add-review', verifyToken, reviewController.addReview)
reviewRouter.put('/update-review', verifyToken, reviewController.updateReview)
reviewRouter.delete('/delete-review', verifyToken, reviewController.deleteReview)

//exports
module.exports = reviewRouter
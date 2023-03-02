const Review = require('../models/reviewModel')
const { reviewMailData } = require("../middlewares/sendMail")
const { transporter } = require("../middlewares/sendMail")


const getAllReviews = async (_req, res) => {
    let reviews = await Review.findAll({})
    if (reviews) {
        res.status(200).send(reviews)
    }
    else {
        res.status(200).send({})
    }
}

const addReview = async (req, res) => {
 

    let info = {
        productId: req.body.productId,
        rating: req.body.rating,
        description: req.body.description,
    }
    const review = await Review.create(info)
    let mail_data = reviewMailData(req.user.email)
    transporter.sendMail(mail_data, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
  
    res.status(200).send(review)

}

const singleReview = async (req, res) => {
    let id = req.params.id
    let review = await Review.findOne({ where: { id: id } })
    res.status(200).send(review)
}

const updateReview = async (req, res) => {
    let id = req.params.id
    let review = await Review.update(req.body, { where: { id: id } })
    res.status(200).send(review)
}

const deleteReview = async (req, res) => {
    let id = req.params.id
    await Review.destroy({ where: { id: id } })
    res.status(200).send('Review is deleted')
}
module.exports = {
    getAllReviews,
    addReview,
    singleReview,
    updateReview,
    deleteReview
}
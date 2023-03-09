const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const SECRET_KEY = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { createUserValidator, signInValidator } = require('../middlewares/validators')

const getAllUsers = async (req, res) => {
    let users = await User.findAll({})

    if (users) {
        res.status(200).send(users)
    }
    else {
        res.status(200).send({})
    }
}


const createUser = async (req, res) => {
    let imageUrl = req.file?.path ?? ""

    const { username, email, password, user_role } = req.body
    console.log('username', imageUrl)
    req.body.image = imageUrl

    let validate = createUserValidator.validate(req.body)

    if (validate.error) {
        res.status(400).json({ "error": validate.error.details[0].message })
    }
    else {
        try {
            const existingUser = await User.findOne({ where: { email: email } })
            if (existingUser) {
                return res.status(400).json({ message: 'user already exists' })
            }
            const hashedPassword = await bcrypt.hash(password, 10)

            const result = await User.create({
                email: email, username: username, password: hashedPassword, user_role: user_role, image: imageUrl
            })

            const token = jwt.sign({ email: result.email, id: result.id }, SECRET_KEY);

            res.status(200).json({ user: result, token: token })
        }
        catch (error) {

            res.status(500).json({ message: "something wrong" })
        }
    }
}


const signIn = async (req, res) => {
    const email = req.body.email ?? "none"
    const username = req.body.username ?? "none"
    const password = req.body.password ?? "none"


    let validate = signInValidator.validate(req.body)

    if (validate.error) {
        res.status(400).json({ "error": validate.error.details[0].message })
    }
    else {
        try {
            const existingUser = await User.findOne({ where: { [Op.or]: [{ email: email }, { username: username }] } })
            if (!existingUser) {
                return res.status(404).json({ message: 'user not found' })
            }
            const matchPassword = await bcrypt.compare(password, existingUser.password)
            if (!matchPassword) {
                return res.status(400).json({ message: "Invalid credentials" })
            }
            const token = jwt.sign({ email: existingUser.email, id: existingUser.id, user_role: existingUser.user_role }, SECRET_KEY);

            res.status(200).json({ user: existingUser, token: token })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "something wrong" })
        }
    }
}

module.exports = {
    getAllUsers,
    createUser,
    signIn
}
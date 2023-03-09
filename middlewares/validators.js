const joi = require('joi')

const schema = {
    createUserValidator: joi.object(
        {
            username: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required().min(8).max(15),
            user_role: joi.string(),
            image: joi.string()
        }
    ),
    signInValidator: joi.object(
        {
            username: joi.string(),
            email: joi.string().email(),
            password: joi.string().required().min(8).max(15)
        }

    ),
    
}


module.exports = schema
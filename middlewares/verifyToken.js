const SECRET_KEY = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) => {
    let authHeader = req.headers.authorization

    if (authHeader == undefined) {
        res.status(401).send({ error: 'token not provided' })
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
            res.status(500).send({ error: "Authentication failed" })
        }
        else {
            req.user = decoded
          
            next();
        }
    })
}


module.exports = verifyToken


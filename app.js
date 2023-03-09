
//imports assigns and settings
const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')
const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewRoute')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const orderRouter = require('./routes/orderRoute')

//env variables
const port = process.env.PORT

//app.use()
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', productRouter)
app.use('/api/review', reviewRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/orders',orderRouter)

//route
app.get('/', (req, res) => {
    res.json({
        "message": "success"
    })
})

//server
app.listen(port, () => {
    console.log('server running successfully in port ' + port, '-------------------> http://localhost:' + port + '/')
})





const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express()


// middleware between the req and res
app.use(express.json()) 

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  

// app.use((req, res, next) =>{
//     req.requestTime  = new Date().toISOString()
//     next()
// })


app.get('/', (req, res) => {
    // res.send({message:'Hello World!'}); or
    res.status(200).json({ message: "Hellow world", app: "new msssa is here" });
});


// mouting the router
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
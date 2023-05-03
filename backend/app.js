

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

  

app.use((req, res, next) =>{
    req.requestTime  = new Date().toISOString()
    next()
})




// mouting the router
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


// check if route not found and this code shoud be put after all the route files
app.all('*', (req,res, next) =>{
  res.status(404).json({
    status:"Error",
    message:`Can not Find ${req.originalUrl} to this route ..`
  }) 
})

module.exports = app
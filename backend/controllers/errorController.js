const AppError = require('./../utils/appError');

const handleValidationErrorDB = (err)=>{
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err)=>{
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // filter the first item from the array
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400)
}

module.exports = (err , req, res, next) =>{

    console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message

    })
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  };
  
  const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
  
      // Programming or other unknown error: don't leak error details
    } else {
      // 1) Log error
      console.error('ERROR 💥', err);
  
      // 2) Send generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
  };
  
  module.exports = (err, req, res, next) => {
    // console.log(err.stack);
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err };

      if (error.name === "CastError") {
        error = handleValidationErrorDB(error);
      }
      if (error.name === "11000") {
        error = handleDuplicateFieldsDB(error);
      }
      
      sendErrorProd(error, res);
    }
  };
  
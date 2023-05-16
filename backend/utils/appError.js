class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4 ") ? "fail" : "error"; //this can be fail or error
    this.isOperational = true; // Programing error

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

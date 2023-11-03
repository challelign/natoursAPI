class AppError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		// this.status = `${statusCode}`.startsWith("4 ") ? "fail" : "error"; //this can be fail or error

		this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

		this.isOperational = true; // Programming error

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;

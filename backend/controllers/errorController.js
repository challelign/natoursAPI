const logger = require("../logger");
const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	console.log(value);

	const message = `Duplicate field value: ${value}. Please use another value!`;
	logger.error(new Error(message));

	return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);

	console.log("handleValidationErrorDB ", errors);
	const message = `Invalid input data. ${errors.join(". ")}`;
	logger.error(new Error(message));

	return new AppError(message, 400);
};

const handleJWTError = () => {
	logger.error(new Error("Invalid Token Please login again"));

	new AppError("Invalid Token Please login again .", 401);
};

const handleTokenExpiredError = () => {
	logger.error(new Error("The Token is Expired. "));

	new AppError("The Token is Expired. ", 401);
};

const handleMulterError = () => new AppError("Too many files uploaded . ", 401);

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	let error = { ...err };
	error.message = err.message;

	if (err.name === "CastError") error = handleCastErrorDB(err);
	if (err.code === 11000 || err.name === "MongoError")
		error = handleDuplicateFieldsDB(err);
	if (err.name === "ValidationError") error = handleValidationErrorDB(err);
	if (err.name === "JsonWebTokenError") error = handleJWTError();
	if (err.name === "TokenExpiredError") error = handleTokenExpiredError();

	if (err.name === "MulterError" || err.code === "LIMIT_UNEXPECTED_FILE")
		error = handleMulterError();
	// Log to console for dev
	console.log("The Error Log is ", err);
	// if the err is not from the above this will excute
	logger.error(new Error("Server Error , Server Error "));

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error",
	});
};

module.exports = (err, req, res, next) => {
	console.log(err.stack);
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === "production") {
		sendErrorProd(err, res);
	}
};

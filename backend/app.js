const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/errorController");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const app = express();

// middleware between the req and res
app.use(cors());
// body parser reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// 1) Global MIDDLEWARES
// set security HTTP headers
app.use(helmet());
// Development Logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
// Limit requests from the same API
const limiter = rateLimit({
	// 100 request from 1 pc Ip for only 1 hrs
	max: 5,
	windowMs: 60 * 60 * 1000,
	message: "Too Many request from this IP , please try again in an hour",
});
app.use("/api", limiter);

// Data sanitization against NoSql query injection
// MongoDB operators that can be used for query injection attacks
// $gt, $lt, $gte, $lte, $in, $nin, $regex, $where,
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// prevent parameter pollution
app.use(
	hpp({
		whitelist: [
			"duration",
			"ratingsQuantity",
			"ratingsAverage",
			"maxGroupSize",
			"difficulty",
			"price",
		],
	})
);

// Test MiddleWare
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	// console.log(req.headers)
	next();
});

// mounting the router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

// check if route not found and this code should be put after all the route files
app.all("*", (req, res, next) => {
	// res.status(404).json({
	//   status:"Error",
	//   message:`Can not Find ${req.originalUrl} to this route ..`
	// })

	next(new AppError(`Can not Find ${req.originalUrl} to this route ..`, 404));
});

app.use(globalErrorController);

module.exports = app;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/errorController");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const app = express();

// middleware between the req and res
app.use(cors());
app.use(express.json());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

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

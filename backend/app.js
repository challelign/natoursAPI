const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/errorController");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

// middleware between the req and res
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

// mouting the router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// check if route not found and this code shoud be put after all the route files
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status:"Error",
  //   message:`Can not Find ${req.originalUrl} to this route ..`
  // })

  next(new AppError(`Can not Find ${req.originalUrl} to this route ..`, 404));
});

app.use(globalErrorController);

module.exports = app;

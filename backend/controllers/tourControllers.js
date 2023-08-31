const Tour = require("./../models/tourModel");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("../utils/apiFeaturs");

const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const path = require("path");
// this class act as middleware
exports.aliasTopTours = (req, res, next) => {
	req.query.limit = "5";
	req.query.sort = "-ratingsAverage,price";
	req.query.fields = "name,price,ratingsAverage,summary,difficulty,images";
	next();
};

// check the older version comments in do not understand
exports.getAllTours = factory.getAll(Tour);

exports.getTour = factory.getOne(Tour, { path: "reviews" });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

/* exports.getTour = catchAsync(async (req, res, next) => {
	const tour = await Tour.findById(req.params.id).populate("reviews");
	if (!tour) {
		return next(new AppError("No tour found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			tour,
		},
	});
}); */

/* exports.createTour = catchAsync(async (req, res, next) => {
	// const newTour = new Tour({})
	// newTour.save()

	// thes same as the above
	const newTour = await Tour.create(req.body);

	res.status(201).json({
		status: "success",
		data: {
			tour: newTour,
		},
	});
}); */

/* exports.updateTour = catchAsync(async (req, res, next) => {
	const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!tour) {
		return next(new AppError("No tour found with that ID", 404));
	}
	res.status(200).json({
		status: "success",
		data: {
			tour,
		},
	});
}); */

/* this method changed to handlerFactory deleteOne fun
exports.deleteTour = catchAsync(async (req, res, next) => {
	const tour = await Tour.findByIdAndDelete(req.params.id);
	if (!tour) {
		return next(new AppError("No tour found with that ID", 404));
	}
	res.status(204).json({
		status: "success",
		data: null,
	});
}); */

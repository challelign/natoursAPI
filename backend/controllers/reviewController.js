const Review = require("./../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, nex) => {
	const reviews = await Review.find();
	res.status(200).json({
		status: "success",
		results: reviews.length,
		data: {
			reviews,
		},
	});
});
exports.createReview = catchAsync(async (req, res, next) => {
	// allow nested routes

	if (!req.body.tour) {
		req.body.tour = req.params.tourId;
	}
	if (!req.body.user) {
		req.body.user = req.user.id;
	}

	const newReview = await Review.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			review: newReview,
		},
	});
});

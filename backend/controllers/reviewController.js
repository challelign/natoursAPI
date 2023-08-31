const Review = require("./../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

// /tours/tourId/reviews/
exports.getAllReviews = catchAsync(async (req, res, nex) => {
	let filter = {};
	if (req.params.tourId) {
		filter = { tour: req.params.tourId };
	}
	const reviews = await Review.find(filter);
	res.status(200).json({
		status: "success",
		results: reviews.length,
		data: {
			reviews,
		},
	});
});

exports.setTourUserIds = (req, res, next) => {
	if (!req.body.tour) {
		req.body.tour = req.params.tourId;
	}
	if (!req.body.user) {
		req.body.user = req.user.id;
	}
	next();
};

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

// /tours/tourId/reviews/
/* exports.createReview = catchAsync(async (req, res, next) => {
	// allow nested routes
	const newReview = await Review.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			review: newReview,
		},
	});
}); */

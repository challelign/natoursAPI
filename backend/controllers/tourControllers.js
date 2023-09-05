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

// tours-within/:distance/center/:latlng/unit/:unit
// tours-within/400/center/11.571071045787587, 37.36253010971726/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
	const { distance, latlng, unit } = req.params;
	const [lat, lng] = latlng.split(",");

	const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;
	if (!lat || !lng) {
		next(
			new AppError(
				"Please Provide latitude and longitude in the format lat,lng.",
				404
			)
		);
	}
	// console.log(distance, lat, lng);
	// find tour with startLocation
	const tours = await Tour.find({
		startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }, // geoWithin and centerSphere are mongo Geospatial variables
	});
	res.status(200).json({
		status: "success",
		results: tours.length,
		data: {
			data: tours,
		},
	});
});

exports.getDistances = catchAsync(async (req, res, next) => {
	const { latlng, unit } = req.params;
	const [lat, lng] = latlng.split(",");

	const multiplier = unit === "mi" ? 0.000621371 : 0.001;

	if (!lat || !lng) {
		next(
			new AppError(
				"Please provide latitude and longitude in the format lat,lng.",
				400
			)
		);
	}

	const distances = await Tour.aggregate([
		{
			$geoNear: {
				near: {
					type: "Point",
					coordinates: [lng * 1, lat * 1],
				},
				distanceField: "distance",
				distanceMultiplier: multiplier,
				spherical: true,
			},
		},
		{
			$project: {
				distance: 1,
				name: 1,
			},
		},
	]);

	console.log(lat, lng, distances);
	res.status(200).json({
		status: "success",
		data: {
			data: distances,
		},
	});
});

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

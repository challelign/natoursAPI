const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const Tour = require("./../models/tourModel");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("../utils/apiFeaturs");

const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const path = require("path");

const multerStorage = multer.memoryStorage();

// the check the file is image only
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not An image ! Please upload only images.", 400), false);
	}
};
const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
	{ name: "imageCover", maxCount: 1 },
	{ name: "images", maxCount: 4 },
]);

// Custom validation function
exports.validateMaxCount = catchAsync(async (req, res, next) => {
	// Check if the uploaded files exceed the maximum count
	const { imageCover, images } = req.files || {};
	if (imageCover && imageCover.length > 1) {
		return next(new AppError("Only 1 imageCover file is allowed.", 400));
	}
	if (images && images.length > 4) {
		// return res.status(400).json({ error: "Only 4 images are allowed." });
		return next(new AppError("Only 4 images are allowed.", 400));
	}

	next();
});
/* 
exports.deleteFilesStartingWith = catchAsync(async (req, res, next) => {
	const directoryPath = "public/img/tours/";
	const prefix = `tour-${req.params.id}`;
	try {
		fs.readdirSync(directoryPath).forEach((file) => {
			if (file.startsWith(prefix)) {
				fs.unlinkSync(directoryPath + file);
				console.log(`${file} has been deleted.`);
			}
		});
		next();
	} catch (error) {
		console.error(`Failed to delete image: ${error}`);
		res.status(500).send("Failed to delete image");
	}
}); */
exports.resizeTourImages = catchAsync(async (req, res, next) => {
	console.log(req.files);
	// if either the imageCover or images property is missing goto next middleware do nothing
	if (!req.files.imageCover || !req.files.images) {
		return next();
	}
	// Delete old imageCover and images
	const directoryPath = "public/img/tours/";
	try {
		fs.readdirSync(directoryPath).forEach((file) => {
			// console.log(`chalie test test test for image delete ${directoryPath}`);

			if (file.startsWith(`tour-${req.params.id}`)) {
				fs.unlinkSync(directoryPath + file);
				console.log(`${file} has been deleted.`);
			}
		});
	} catch (error) {
		console.error(`Failed to delete image ${file}: ${error}`);
	}
	// 1 imageCover processing
	req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
	await sharp(req.files.imageCover[0].buffer)
		.resize(2000, 1333)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`public/img/tours/${req.body.imageCover}`);

	// 2 Images
	req.body.images = [];
	await Promise.all(
		req.files.images.map(async (file, i) => {
			const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

			await sharp(file.buffer)
				.resize(2000, 1333)
				.toFormat("jpeg")
				.jpeg({ quality: 90 })
				.toFile(`public/img/tours/${filename}`);

			req.body.images.push(filename);
		})
	);
	next();
});

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

exports.getTourUsingSlug = catchAsync(async (req, res, next) => {
	const tour = await Tour.findOne({ slug: req.params.slug }).populate({
		path: "reviews",
		fields: "review rating user",
	});
	if (!tour) {
		return next(new AppError("No tour found with that slug", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			tour,
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

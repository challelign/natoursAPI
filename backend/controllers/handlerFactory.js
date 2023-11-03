const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeaturs");

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);
		if (!doc) {
			return next(new AppError("No Document found with that ID", 404));
		}
		res.status(204).json({
			status: "success",
			data: null,
		});
	});

exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!doc) {
			return next(new AppError("No Documents found with that ID", 404));
		}
		res.status(200).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

exports.getOne = (Model, popOptions) =>
	catchAsync(async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if (popOptions) {
			query = query.populate(popOptions);
		}
		const doc = await query;
		if (!doc) {
			return next(new AppError("No documents found with that ID", 404));
		}

		res.status(200).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		// for ratting get all
		// To allow for nested GET reviews on Tour (hack)

		// to count all the data in the model
		const featuresCount = new APIFeatures(Model.find(), req.query);
		const countAll = await featuresCount.query;

		let filter = {};
		if (req.params.tourId) {
			filter = { tour: req.params.tourId };
		}

		const features = new APIFeatures(Model.find(filter), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const doc = await features.query;
		res.status(200).json({
			status: "success",
			totalRes: doc.length,
			totalCount: countAll.length,
			data: {
				data: doc,
			},
		});
	});

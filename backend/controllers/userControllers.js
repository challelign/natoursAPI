const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) {
			newObj[el] = obj[el];
		}
	});
	return newObj;
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		totalUsers: users.length,
		status: "success",
		data: users,
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	// 1 create error if user POST a password data
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				"This route is not for password updates, please use /users/updateMyPassword",
				400
			)
		);
	}
	// 2 Filter out unwanted Fields name that are not allowed to be updated
	const filteredBody = filterObj(req.body, "name", "email");

	// 3 update user document
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});
	updatedUser.save();
	res.status(200).json({
		status: "success",
		data: {
			user: updatedUser,
		},
	});
});

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });
	res.status(204).json({
		status: "success",
		data: null,
	});
});

exports.getUser = (req, res) => {
	res.status(500).json({
		status: "Error",
		message: "This Route is not Found",
	});
};
exports.createUser = (req, res) => {
	res.status(500).json({
		status: "Error",
		message: "This Route is not Found",
	});
};
//Do NOT update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

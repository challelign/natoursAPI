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

exports.getAllUsers = factory.getAll(User);
// exports.getAllUsers = catchAsync(async (req, res, next) => {
// 	const users = await User.find();
// 	res.status(200).json({
// 		totalUsers: users.length,
// 		status: "success",
// 		data: users,
// 	});
// });

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

// get user id from the session not from the req.
exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};
exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });
	res.status(204).json({
		status: "success",
		data: null,
	});
});

// no populate value to send the factoryHandler getOne func
exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
	res.status(500).json({
		status: "Error",
		message: "This Route is not Defined ! Please use, users/Signup instead",
	});
};
//Do NOT update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

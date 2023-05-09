const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: users,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This Route is not Found',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This Route is not Found',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This Route is not Found',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This Route is not Found',
  });
};

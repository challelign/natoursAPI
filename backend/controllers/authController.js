const { promisify } = require("util");
const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })
  // i can also send the whole user as payload data
  // const token = jwt.sign({user:newUser}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })

  // this also the same but if someone send req.body it will send extra filed different from the field below
  // use the above method always , b/c allowd filed are sent only the listed one
  // const {name ,email, password ,passwordConfirm } = req.body
  // const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  // 1.check if email and password exists
  if (!password || !email) {
    return next(new AppError("Please Provide avalid email or password", 404));
  }

  // 2 check if the user exists and password is correct
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email Or Password ", 401));
  }

  console.log(user);
  // 3 if everything is ok send token to the client
  // const token = jwt.sign({user:user}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })
  // const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })

  const token = signToken({ id: user._id }); // calling the signToken function

  res.status(200).json({
    status: "success",
    token: token,
    data: user,
  });
});

exports.protect = catchAsync(async (req, res, next) => {

  // 1) Getting token and check of it is there
  let token;
  if (req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3 Check if user still exists

  next();
});

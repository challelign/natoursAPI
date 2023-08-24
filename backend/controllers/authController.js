const crypto = require("crypto");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const sendEmail = require("../utils/email");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
	return jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);

	// SENDING COOKIE TO THE BROWSER

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		// secure: false, // this should be true in production
		httpOnly: true,
	};

	if (process.env.NODE_ENV === "production") {
		cookieOptions.secure = true;
	}
	res.cookie("jwt", token, cookieOptions);

	// remove the password from the output
	user.password = undefined;
	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		// changePasswordAt: req.body.changePasswordAt,
	});

	// const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })
	// i can also send the whole user as payload data
	// const token = jwt.sign({user:newUser}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })

	// this also the same but if someone send req.body it will send extra filed different from the field below
	// use the above method always , b/c allowd filed are sent only the listed one
	// const {name ,email, password ,passwordConfirm } = req.body
	// const newUser = await User.create(req.body);

	// before createSendToken class
	/* const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
 */
	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { password, email } = req.body;

	console.log("Email and Password fro Request is =>", req.body);
	// 1.check if email and password exists
	if (!password || !email) {
		return next(new AppError("Please Provide a valid email or password", 404));
	}

	// 2 check if the user exists and password is correct
	const user = await User.findOne({ email: email }).select("+password");

	if (!user || !(await user.correctPassword(password, user.password))) {
		//correctPassword func from user model
		return next(new AppError("Incorrect Email Or Password ", 401));
	}

	console.log(user);
	// 3 if everything is ok send token to the client
	// const token = jwt.sign({user:user}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })
	// const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,  { expiresIn: process.env.JWT_EXPIRES_IN })

	createSendToken(user, 200, res);

	/*  const token = signToken({ id: user._id }); // calling the signToken function

  res.status(200).json({
    status: "success",
    token: token,
    data: user,
  }); 
  
  */
});

exports.logout = (req, res) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it is there
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(
			new AppError("You are not logged in! Please log in to get access.", 401)
		);
	}

	// 2) Verification token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	console.log("curr User ", decoded);
	console.log("curr User id form deco ", decoded.id); //this return object of user id

	// 3 Check if user still exists
	// const currentUser = await User.findById(decoded.id);
	const currentUser = await User.findById(decoded.id);
	console.log(" curr User Id is ", currentUser);
	if (!currentUser) {
		return next(
			new AppError("User not found! Please log in to get access.", 401)
		);
	}

	// 4 check if the user changed the password after the token is issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		//changedPasswordAfter func from user model
		return next(
			new AppError("User recently changed password! Please log in again.", 401)
		);
	}
	// grant access to the protected route
	req.user = currentUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// roles ['user', 'guide', 'lead-guide', 'admin']
		// req.user.role  comes form the protect class  => req.user = currentUser;
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError("You do not have permission to perform this action", 403)
			);
		}
		next();
	};
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
	// 1 get user based on the given req.body.email email
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError("User not found", 404));
	}
	// 2 generate random reset token
	const resetToken = user.createPasswordResetToken(); //createPasswordResetToken func from user model
	await user.save({ validateBeforeSave: false }); //this is built-in mongoose document

	// 3 send it to the email
	const resetUrl = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/users/resetPassword/${resetToken}`;
	const message = `You are receiving this email because you (or someone else) 
  have requested the reset of a password. Please make a 
  PUT request to: \n\n ${resetUrl}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`;

	try {
		await sendEmail({
			email: user.email,
			subject: "Password Reset Token valid for 10 minuet",
			message,
		});

		res.status(200).json({
			status: "success",
			data: "Token sent to Email",
		});
	} catch (err) {
		user.passwordResetToken.undefined;
		user.passwordResetExpires.undefined;
		await user.save({ validateBeforeSave: false }); //this is built-in mongoose document
		return next(
			new AppError("Their was an error sending the email. try again later", 500)
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1 get user based on the token
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token) // from the url of forgetPassword/:token
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// 2 if the token has not expired and their is user set a new password
	if (!user) {
		return next(
			new AppError("Password reset token is invalid or has expired", 400)
		);
	}

	// 3 update the  changedPasswordAt property of the user
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();
	// 4 Log the user and send JWT  id: user._id
	// const token = signToken( user._id);

	createSendToken(user, 200, res);
	/* 
  const token = signToken({ id: user._id });
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  }); 
  
  */
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	// 1 get user from the database
	const user = await User.findById(req.user.id).select("+password"); // req,user.id comes from protect route

	// 2 check if POST current password is correct
	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError("Your current password is incorrect", 401));
	}

	// 3 if so update the password
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	// 4 Log the user and send JWT
	createSendToken(user, 200, res);
});

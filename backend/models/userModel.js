const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please tell us your name!"],
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	photo: {
		type: String,
		default: "default.jpg",
	},
	isAuthenticated: {
		type: Boolean,
		default: true,
	},
	role: {
		type: String,
		enum: ["user", "guide", "lead-guide", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Please confirm your password"],
		validate: {
			// This only works on CREATE and SAVE!!!
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords are not the same!",
		},
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	changePasswordAt: Date,

	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

// while import comment this start
userSchema.pre("/^find/", function (next) {
	// this point to the current query
	this.find({ active: { $ne: false } });
	next();
});
userSchema.pre("save", async function (next) {
	// this only run when the password is actualy modfied
	if (!this.isModified("password")) {
		return next();
	}

	// hasing the password
	this.password = await bcrypt.hash(this.password, 12);

	// delete the passwordConfirm  filed
	this.passwordConfirm = undefined;
	next();
});
//  while import comment this end

// candidatePasswoerd => req.body.password and userPassword is user.password from the database
// this class called in authController method of password Verify
// this method is avilable to every userModle class
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.changePasswordAt) {
		// console.log("date Log ", this.changePasswordAt, JWTTimestamp);
		// const changedTimestamp = parseInt(
		//   this.changePasswordAt.getTime() / 100,
		//   10
		// );
		// console.log("date Log ", this.changedTimestamp, JWTTimestamp);
		// return JWTTimestamp < changedTimestamp;
		return JWTTimestamp < this.changePasswordAt;
	}
	// false means NOT changed
	return false;
};

// for changing the password using resetPassword
userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) {
		return next();
	}
	// this helps to create date for password before 1 second token created
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // for only 10 minutes

	return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;

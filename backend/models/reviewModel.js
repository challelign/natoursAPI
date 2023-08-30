const mongoose = require("mongoose");
const Tour = require("./tourModel");

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: [true, "Review can not be empty!"],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		tour: {
			type: mongoose.Schema.ObjectId,
			ref: "Tour",
			required: [true, "Review must belong to a tour."],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Review must belong to a user"],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// QUERY MIDDLEWARE

// to populate the  user and tour data that link with review
reviewSchema.pre(/^find/, function (next) {
	// no need to populate tour at this b/c it is populated at tours model
	/* 	this.populate({ path: "tour", select: "name" }).populate({
		path: "user",
		select: "name photo email",
	});
 */
	this.populate({
		path: "user",
		select: "name photo email",
	});
	next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A tour must have a name"],
			unique: true,
			trim: true,
			maxlength: [40, "A tour name must have less or equal then 40 characters"],
			minlength: [10, "A tour name must have more or equal then 10 characters"],
			// this validation is not working b/c space is not supported
			// validate: [validator.isAlpha, 'Tour name must only contain characters']
		},
		slug: {
			type: String,
		},
		duration: {
			type: Number,
			required: [true, "A tour must have a duration"],
		},
		maxGroupSize: {
			type: Number,
			required: [true, "A tour must have a group size"],
		},
		difficulty: {
			type: String,
			required: [true, "A tour must have a difficulty"],
			enum: {
				values: ["easy", "medium", "difficult"],
				message: "Difficulty is either: easy, medium, difficult",
			},
		},

		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
			set: (val) => Math.round(val * 10) / 10, /// 4.77777, 47.777, 4.8
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, "A tour must have a price"],
		},
		priceDiscount: {
			type: Number,
			default: 0,
			/* validate: {
				validator: function (val) {
					// this only points to current doc on NEW document creation
					return val < this.price; // this.price referes to the price attribute
				},
				message: `Discount price ({VALUE}) should be below regular price (${this.price})`,
			}, */
		},
		summary: {
			type: String,
			trim: true,
			require: [true, "A Tour must have a description"],
		},
		description: {
			type: String,
			trim: true,
		},

		imageCover: {
			type: String,
			require: [true, "A tour must have a cover image"],
		},
		images: [String],
		createdAt: {
			type: Date,
			default: Date.now(),
			select: true,
		},
		startDates: [Date],
		secretTour: {
			type: Boolean,
			default: false,
		},

		// uncomment this start
		/* 		startLocation: {
			//GeoJSON
			type: {
				type: String,
				default: "Point",
				enum: ["Point"],
			},
			coordinates: [Number],
			address: String,
			description: String,
		},
		// Array
		locations: [
			{
				type: {
					type: String,
					default: "Point",
					enum: ["Point"],
				},
				coordinates: [Number],
				address: String,
				description: String,
				day: Number,
			},
		], */

		// uncomment this end

		// guides: Array,
		guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Virtual populate
tourSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "tour",
	localField: "_id",
});

// tourSchema.index({price:1})

// un comment this start
/* 
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });

 */
// un comment this end

// tourSchema.index({ location: "2dsphere" });
// DOCUMENT MIDDLEWARE: runs before .save() and .create()

//  this code add to mongodb by finding user using the give id from tour post
// then get all user attribute and
// save to guides column

// tourSchema.pre("save", async function (next) {
// 	const guidesPromises = this.guides.map(async (id) => await User.findById(id));
// 	this.guides = await Promise.all(guidesPromises);
// 	next();
// });

tourSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
	this.populate({ path: "guides", select: "-__v  -changePasswordAt" });
	next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

class APIFeatures {
	constructor(query, queryString) {
		this.query = query; // the mongo query
		this.queryString = queryString; // experess query coming from the route
	}
	filter() {
		// 1. Build the query
		const queryObj = { ...this.queryString };
		const exculdedField = ["page", "limit", "sort", "fields"];
		exculdedField.forEach((el) => delete queryObj[el]);

		// 2) Advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // g helps to loop and check match for all
		this.query.find(JSON.parse(queryStr));
		return this;
	}
	sort() {
		// 3 Sorting
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			// query = query.sort(req.query.sort);
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("_CreatedAt");
		}
		return this;
	}
	limitFields() {
		// 5. Limiting the Fields (the fileds that pass are  shown to the user)
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select("-__v");
		}
		return this;
	}

	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100; // loaded data for first time from the whole data
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}
module.exports = APIFeatures;

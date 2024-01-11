class APIFeatures {
	constructor(query, queryString) {
		this.query = query; // the mongo query
		this.queryString = queryString; // experess query coming from the route
	}

	filter() {
		// 1. Build the query
		const queryObj = { ...this.queryString };
		const excludedField = ["page", "limit", "sort", "fields", "search"]; // Add "search" to the excluded fields
		excludedField.forEach((el) => delete queryObj[el]);

		// 2. Advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
		this.query.find(JSON.parse(queryStr));

		// 3. Search functionality
		if (this.queryString.search) {
			const searchQuery = {
				// Modify this based on your search requirements
				$or: [
					{ name: { $regex: this.queryString.search, $options: "i" } }, // Case-insensitive search for field1
					{ difficulty: { $regex: this.queryString.search, $options: "i" } }, // Case-insensitive search for field2
					// Add more fields as needed
				],
			};
			this.query.find(searchQuery);
		}

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

	async paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100; // loaded data for the first time from the whole data
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);

		// Add previous and next page information
		const numDocuments = await this.query.model.countDocuments(); // Get the total number of documents for the query
		const totalPages = Math.ceil(numDocuments / limit);

		const pagination = {};

		if (page > 1) {
			pagination.previous = {
				page: page - 1,
				limit: limit,
			};
		}

		if (page < totalPages) {
			pagination.next = {
				page: page + 1,
				limit: limit,
			};
		}

		return {
			query: this.query,
			pagination: pagination,
		};
	}
	/* paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100; // loaded data for first time from the whole data
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);

		return this;
	} */
}
module.exports = APIFeatures;

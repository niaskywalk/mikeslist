"use strict";

let mongoose = require("mongoose");
let categorySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: [true, "Category name may not be blank"]
	}
});

let Category = mongoose.model("Category", categorySchema);

module.exports = Category;
"use strict";

let mongoose = require("mongoose");
let categorySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		lowercase: true
	},
	listings: [{type: String, ref: "Listing"}]
});

let Category = mongoose.model("Category", categorySchema);

module.exports = Category;
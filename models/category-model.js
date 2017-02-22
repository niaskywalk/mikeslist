"use strict";

let mongoose = require("mongoose");
let categorySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: [true, "Category name may not be blank"]
	},
	listings: [{type: String, ref: "Listing"}]
});

//create a virtual field to report the number of listings in a category
categorySchema.virtual("listingCount").get(function() {
	return this.listings.length;
});

//ensure that the virtual fields are included when document is sent back
//via json or used as object
categorySchema.set("toObject", {virtuals: true});
categorySchema.set("toJSON", {virtuals: true});

let Category = mongoose.model("Category", categorySchema);

module.exports = Category;
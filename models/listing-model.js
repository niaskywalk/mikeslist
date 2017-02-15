"use strict";

let mongoose = require("mongoose");
let betterId = require("mongoose-better-id");
let listingSchema = new mongoose.Schema({
	title: String,
	body: String,
	posterEmail: String,
	categories: [{type: mongoose.Schema.Types.ObjectId, ref: "Category"}]
});

listingSchema.plugin(betterId, {
  connection: mongoose.connection,
  field: '_id',
  prefix: 'listing_',
  suffix: {
    start: 0,
    step: 1,
    max: 99,
  },
  timestamp: {
    enable: true,
    format: 'yyMMddhhmmssS'
  }
});

let Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
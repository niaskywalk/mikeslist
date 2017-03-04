"use strict";

let mongoose = require("mongoose");
let betterId = require("mongoose-better-id");
let listingSchema = new mongoose.Schema({
	title: String,
	body: String,
	posterEmail: String,
	categories: [{type: mongoose.Schema.Types.ObjectId, ref: "Category"}]
});

mongoose.Promise = global.Promise;

//this plugin changes the way the _id field is represented
//the current representation looks like listing_<yyMMddhhssS><0-99>
//allowing for 100 articles to be created every millisecond
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
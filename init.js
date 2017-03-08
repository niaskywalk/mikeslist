"use strict";

let mongoose = require("mongoose");
let Category = require("./models").Category;
const uncategorizedId = require("./config.js").uncategorizedId;

mongoose.Promise = global.Promise;

module.exports = function(done) {
	return Category.update({
		_id: mongoose.Types.ObjectId(uncategorizedId),
		name: "uncategorized"
	}, {}, {upsert: true}, done);
};
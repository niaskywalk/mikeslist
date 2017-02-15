"use strict";
module.exports = app => {
	app.use("/api/v1", require("./listing-routes"));
	app.use("/api/v1", require("./category-routes"));
};
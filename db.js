"use strict";
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/mikeslist");

mongoose.connection.on("connected", () => {
	console.log("Connection to database successful");
});

mongoose.connection.on("error", (err) => {
	console.error(err.message);
	process.exit();
});
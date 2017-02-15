"use strict";

let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");

var Listing = require("../models").Listing;

router.use(bodyParser.json());

router.get("/listings", getAllListings);
router.get("/listing/:id", getSingleListing);
router.post("/listing", createNewListing);
router.put("/listing/:id", updateListing);
router.delete("/listing/:id", removeListing);

function getAllListings(req, res, next) {
	Listing.find().
	populate({
		path: "categories",
		select: "name"
	}).
	then(data => {
		return res.json(data);
	}).
	catch(err => {
		return next(err);
	});
}

function getSingleListing(req, res, next) {
	Listing.findById(req.params.id).
	populate({
		path: "categories",
		select: "name"
	}).
	then(data => {
		if (!data) {
			var error = new Error("Listing not found");
			error.code = 404;
			return Promise.reject(error);
		} else {
			return res.json(data);			
		}
	}).
	catch(err => {
		return next(err);
	});
}

function createNewListing(req, res, next) {
	var listing = new Listing(req.body);
	listing.save().
	then(data => {
		return res.json(data);
	}).
	catch(err => {
		return next(err);
	});
}

function updateListing(req, res, next) {
	Listing.findById(req.params.id).
	then(data => {
		if (!data) {
			var error = new Error("Listing not found");
			error.code = 404;
			return Promise.reject(error);
		} else {
			Object.assign(data, req.body);
			return data.save();			
		}
	}).
	then((data) => {
		return res.json(data);
	}).
	catch((err) => {
		return next(err);
	});
}

function removeListing(req, res, next) {
	Listing.findById(req.params.id).
	then(data => {
		if (!data) {
			var error = new Error("Listing not found");
			error.code = 404;
			return Promise.reject(error);
		} else {
			return data.remove();			
		}
	}).
	then(data => {
		return res.json(data);
	}).
	catch(err => {
		return next(err);
	});
}

module.exports = router;
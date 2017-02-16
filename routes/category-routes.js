"use strict";

let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");

var Category = require("../models").Category;
var Listing = require("../models").Listing;

router.use(bodyParser.json());

router.get("/categories", getAllCategories);
router.get("/category/:name", getSingleCategory);
router.post("/category", createNewCategory);
router.put("/category/:name", updateCategory);
router.delete("/category/:name", removeCategory);

function getAllCategories(req, res, next) {
	Category.find().
	then(data => {
		return res.json(data);
	}).
	catch(err => {
		return next(err);
	});
}

function getSingleCategory(req, res, next) {
	Category.findOne({name: req.params.name}).
	then(data => {
		if (!data) {
			var error = new Error("Category not found");
			error.code = 404;
			return Promise.reject(error);
		} else {
			return Listing.find({categories: data._id}).populate({
				path: "categories",
				select: "name"
			});
		}
	}).
	then(data => {
		return res.json(data);
	}).
	catch(err => {
		return next(err);
	});
}

function createNewCategory(req, res, next) {
	var category = new Category(req.body);
	category.save().
	then(data => {
		return res.json(data);
	}).
	catch(err => {
		if (err.code === 11000) {
			err.humanReadableError = "Category with this name already exists";
		} 
		return next(err);
	});
}

function updateCategory(req, res, next) {
	Category.findOne({name: req.params.name}).
	then(data => {
		if (!data) {
			var error = new Error("Category not found");
			error.code = 404;
			return Promise.reject(error);
		} else {
			Object.assign(data, req.body);
			return data.save();
		}
	}).
	then(data => {
		return res.json(data);
	}).
	catch(err => {
		if (err.code === 11000) {
			err.humanReadableError = "Category with this name already exists";
		}
		return next(err);
	});
}

function removeCategory(req, res, next) {
	Category.findOne({name: req.params.name}).
	then(data => {
		if (!data) {
			var error = new Error("Category not found");
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
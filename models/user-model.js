"use strict";

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: [true, "User must have an email"]
	},
	password: String,
	admin: {
		type: Boolean,
		default: false
	}
});

mongoose.Promise = global.Promise;

UserSchema.methods.verifyPassword = function(password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.pre("save", function(next) {
	let user = this;
	const SALT_ROUNDS = 10;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.hash(user.password, SALT_ROUNDS).
	then(hash => {
		user.password = hash;
		return next();
	});
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
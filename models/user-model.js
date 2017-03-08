"use strict";

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let PasswordValidator = require("password-validator");

let passwordValidator = new PasswordValidator();
passwordValidator.isMin(8);
passwordValidator.isMax(20);
// passwordValidator.has().uppercase();
// passwordValidator.has().lowercase();
// passwordValidator.has().digits();
// passwordValidator.has().symbols();

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
	if (user.password && !passwordValidator.validate(user.password)) {
		return next(user.invalidate("password", new Error("Password is weak")));
	}
	bcrypt.hash(user.password, SALT_ROUNDS).
	then(hash => {
		user.password = hash;
		return next();
	});
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
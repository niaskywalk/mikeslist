"use strict";

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let PasswordValidator = require("password-validator");

//this middleware sets the password security rules
//rules can be enabled as necessary
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

//model method to verify password during login
UserSchema.methods.verifyPassword = function(password) {
	return bcrypt.compare(password, this.password);
};

//this runs whenever user is saved into the database
UserSchema.pre("save", function(next) {
	let user = this;
	const SALT_ROUNDS = 10;

	//if password is not modified - return
	if (!user.isModified("password")) {
		return next();
	}

	//check if password passes security rules set on passwordValidator
	//if not - invalidate model and return the error
	if (user.password && !passwordValidator.validate(user.password)) {
		return next(user.invalidate("password", new Error("Password is weak")));
	}

	//hash the password and proceed to store into the database
	bcrypt.hash(user.password, SALT_ROUNDS).
	then(hash => {
		user.password = hash;
		return next();
	});
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
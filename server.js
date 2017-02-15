"use strict";
let express = require("express");
let app = express();
const PORT = process.env.NODE_PORT || 3000;

require("./db");

app.use(express.static("public"));

require("./routes")(app);

app.get("*", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.use((err, req, res, next) => {
	if (err.code === 404) {
		res.status(404).json({
			error: err.message
		});
	} else {
		next(err);
	}
});

app.use((err, req, res, next) => {
	if (err.code === 11000) {
		res.status(409).json({
			error: err.humanReadableError
		});
	} else {
		next(err);
	}
});

app.use((err, req, res, next) => {
	if (app.get("env") !== "production") {
		return res.status(500).json({
			error: err.message
		});
	} else {
		return res.status(500).json({
			error: "(500) Internal Server Error"
		});
	}
	next(err);
});

app.listen(PORT, () => {
	console.log(`Server active on port ${PORT}`);
});
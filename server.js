"use strict";
let express = require("express");
let app = express();
const PORT = process.env.NODE_PORT || 3000;
app.use(express.static("public"));
app.get("*", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
app.use((err, req, res, next) => {
	if (app.get("env") !== "production") {
		return res.json({
			error: err.message
		});
	} else {
		return res.json({
			error: "(500) Internal Server Error"
		});
	}
	next();
});
app.listen(PORT, () => {
	console.log(`Server active on port ${PORT}`);
});
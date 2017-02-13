"use strict";
let express = require("express");
let app = express();
const PORT = process.env.NODE_PORT || 3000;
app.use(express.static("public"));
app.get("*", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
app.listen(PORT, () => {
	console.log(`Server active on port ${PORT}`);
});
"use strict";
let express = require("express");
let app = express();
const PORT = process.env.NODE_PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server active on port ${PORT}`);
});
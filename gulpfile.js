"use strict";
let gulp = require("gulp");
let nodemon = require("gulp-nodemon");
let browserSync = require("browser-sync").create();
const BROWSER_SYNC_DELAY = 400;

gulp.task("nodemon", () => {
	return nodemon({
		ext: "js",
		ignore: ["public/*"]
	})
	.on("restart", () => {
		global.setTimeout(browserSync.reload, BROWSER_SYNC_DELAY);
	});
});

gulp.task("browser-sync", ["nodemon"], () => {
	return browserSync.init({
		port: 4000,
		proxy: "localhost:3000"
	});
});

gulp.task("default", ["browser-sync"], () => {
	gulp.watch(["public/**/*.html", "public/**/*.tpl", "public/js/main.js"], browserSync.reload);
});
"use strict";
let gulp = require("gulp");
let nodemon = require("gulp-nodemon");
let browserSync = require("browser-sync").create();
let plumber = require("gulp-plumber");
let sourceMaps = require("gulp-sourcemaps");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
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

gulp.task("css", () => {
	return gulp.src("public/scss/main.scss")
		.pipe(plumber(function(error) {
			browserSync.notify('<pre style="text-align: left">' + error.message + '</pre>', 4000);
			this.emit("end");
		}))
		.pipe(sourceMaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("public/css/"))
		.pipe(browserSync.stream())
		.pipe(sourceMaps.write("."))
		.pipe(gulp.dest("public/css/"));
});

gulp.task("default", ["browser-sync"], () => {
	gulp.watch(["public/**/*.html", "public/**/*.tpl", "public/js/main.js"], browserSync.reload);
	gulp.watch("public/scss/**/*.scss", ["css"]);
});
const gulp = require("gulp");
const { rollup } = require("rollup");
const rollupConfig = require("./rollup.config.js");
const browserSync = require("browser-sync").create();
const del = require("del");

// Clean task
gulp.task("clean", () => del(["assets/built"]));

// Rollup task
gulp.task("rollup", async function () {
  const bundle = await rollup(rollupConfig);
  await bundle.write(rollupConfig.output);
});

// Watch task
gulp.task("watch", () => {
  browserSync.init({
    proxy: "localhost:2368", // Ghost'un çalıştığı port
    files: ["assets/built/**/*.{js,css}", "**/*.hbs"],
  });

  gulp.watch("assets/js/**/*.js", gulp.series("rollup"));
  gulp.watch("assets/css/**/*.css", gulp.series("rollup"));
  gulp.watch("**/*.hbs").on("change", browserSync.reload);
});

// Build task
gulp.task("build", gulp.series("clean", "rollup"));

// Dev task
gulp.task("dev", gulp.series("build", "watch"));

// Default task
gulp.task("default", gulp.series("dev"));

import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass"; // import * as sass from 'sass' kullanımı
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css";

// gulp-sass'a sass derleyicisini belirtin
const sass = gulpSass(dartSass);

// SCSS'i CSS'e dönüştürme
gulp.task("scss", function () {
    return gulp
        .src("assets/scss/**/*.scss") // SCSS dosyalarının konumu
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest("assets/built")); // CSS çıktı dosyalarının konumu
});

// JavaScript dosyalarını birleştir ve sıkıştır
gulp.task("js", function () {
    return gulp
        .src("assets/js/**/*.js") // JS dosyalarının konumu
        .pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("assets/built")); // JS çıktı dosyalarının konumu
});

// Gulp izleme görevi
gulp.task("watch", function () {
    gulp.watch("assets/scss/**/*.scss", gulp.series("scss"));
    gulp.watch("assets/js/**/*.js", gulp.series("js"));
});

// Varsayılan Gulp görevi
gulp.task("default", gulp.parallel("scss", "js", "watch"));

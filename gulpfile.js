const { src, dest, watch, series, parallel } = require('gulp'); // specific gulp API functions
// All other gulp related packages
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
var replace = require('gulp-replace'); // use for cachebust

// TODO: add browsersync for wordpress dev

// Create the file paths here in an object
const files = {
    scssPath: 'app/scss**/*.scss',
    jsPath: 'app/js/**/*.js'
}

// SCSS task setup
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps in current directory
        .pipe(dest('dist')) // indicate the destination of compiled CSS
}

// JS task setup
function jsTask() {
    return src([files.jsPath
    // ,'!' + 'includes/js/jquery.min.js, // to exclude any specific files
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist'))
}

// Watch task: watch SCSS and JS files for changes
function watchTask() {
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask));
}

// Export all tasks
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);
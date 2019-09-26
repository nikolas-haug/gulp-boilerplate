const { src, dest, watch, series, parallel } = require('gulp'); // specific gulp API functions
// All other gulp related packages
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

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


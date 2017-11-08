'use strict';

// ---------------------------------------------------------------
// Include Plugins
// ---------------------------------------------------------------
const gulp             = require('gulp');
const sass             = require('gulp-sass');
const plumber          = require('gulp-plumber');
const gutil            = require('gulp-util');
const sourcemaps       = require('gulp-sourcemaps');
const autoprefixer     = require('gulp-autoprefixer');
const browserSync      = require('browser-sync');
const size             = require('gulp-size');

// ---------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------
const path = {
    sass: 'app/assets/scss/**/*.scss',
    css: 'app/assets/css/',
    js: 'app/assets/js/*.js',
    js_vendor: 'app/assets/js/vendor/*.js',
    html: 'app/*.html'
};

const autoprefixerOptions = {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
};

const reload = browserSync.reload;

// gulp-plumber + gulp-util are used for proper error handling and formatting
// see source : https://www.timroes.de/2015/01/06/proper-error-handling-in-gulp-js/
const gulp_src = gulp.src;
gulp.src = function() {
    return gulp_src.apply(gulp, arguments)
        .pipe(plumber(function(error) {
            // Output an error message
            gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
            // emit the end event, to properly end the task
            this.emit('end');
        }));
};

// ---------------------------------------------------------------
// MICRO TASKS
// ---------------------------------------------------------------

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

// Watch our .scss, .html, .js or img files
gulp.task('watch', ['sass', 'serve'], function() {
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.html, reload);
    gulp.watch(path.js, reload);
});

// Add Sourcemaps + Autoprefixer 
// + cache modified files 
// + size the final css filereload on change
// + refresh stream
gulp.task('sass', function() {
    return gulp
        .src(path.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.css))
        .pipe(size())
        .pipe(reload({ stream: true }));
});

// ---------------------------------------------------------------
// MACRO TASKS
// ---------------------------------------------------------------

gulp.task('default', ['watch'], function() {});

/* ---------------------------------------------------------------------
 * | Website Performance Optimization Tasks                            |
 * | © 2015 Israel Bastida | Eter5 Lab.                                |
 * ------------------------------------------------------------------- */
'use strict';


/* ---------------------------------------------------------------------
 * | Required for tasks                                                |
 * ------------------------------------------------------------------- */

// Include Gulp & tools we'll use
var browserSync = require('browser-sync').create(),
    gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')();


/* ---------------------------------------------------------------------
 * | Optimization tasks                                                |
 * ------------------------------------------------------------------- */

// Optimize html
gulp.task('optimize:html', function () {
    return gulp.src('src/*.html')
        .pipe(plugins.changed('./'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});


/* ---------------------------------------------------------------------
 * | Main tasks                                                        |
 * ------------------------------------------------------------------- */

// Server
gulp.task('server', ['optimize:html'], function () {
    // init browsersync
    browserSync.init({
        server: './',
        // tunnel: 'eter5lab',
        // open: 'tunnel',
        browser: 'google chrome canary'
    });
    // watch
    gulp.watch('src/*.html', ['optimize:html']);
});

// Default
gulp.task('default', function () {
    // default task here
});

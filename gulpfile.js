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
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// Optimize styles
gulp.task('optimize:styles', function () {
    return gulp.src('src/css/*.css')
        .pipe(plugins.csso())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Optimize images
gulp.task('optimize:images', function () {
    return gulp.src(['src/img/*.jpg', 'src/img/*.png'])
        .pipe(plugins.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('img'));
});

/* ---------------------------------------------------------------------
 * | Main tasks                                                        |
 * ------------------------------------------------------------------- */

// Server
gulp.task('server', ['optimize:html', 'optimize:styles', 'optimize:images'], function () {
    // init browsersync
    browserSync.init({
        server: './',
        // tunnel: true,
        // open: 'tunnel',
        browser: 'google chrome canary'
    });
    // watch
    gulp.watch('src/*.html', ['optimize:html']);
    gulp.watch('src/css/*.css', ['optimize:styles']);
});

// Default
gulp.task('default', function () {
    // default task here
});

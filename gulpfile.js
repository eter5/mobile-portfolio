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

// html
gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// styles
gulp.task('styles', function () {
    return gulp.src('src/css/*.css')
        .pipe(plugins.csso())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// images
gulp.task('images', function () {
    return gulp.src(['src/img/*.jpg', 'src/img/*.png'])
        .pipe(plugins.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('img'));
});

// pizza html
gulp.task('pizza:html', function () {
    return gulp.src('src/views/pizza.html')
        .pipe(gulp.dest('views'))
        .pipe(browserSync.stream());
});

// pizza styles
gulp.task('pizza:styles', function () {
    return gulp.src(['src/views/css/style.css', 'src/views/css/bootstrap-grid.css'])
        .pipe(plugins.concat('main.css'))
        // .pipe(plugins.csso())
        .pipe(gulp.dest('views/css'))
        .pipe(browserSync.stream());
});

// pizza scripts
gulp.task('pizza:scripts', function () {
    return gulp.src('src/views/js/main.js')
        .pipe(gulp.dest('views/js'))
        .pipe(browserSync.stream());
});

// images
gulp.task('pizza:images', function () {
    return gulp.src(['src/views/images/*.jpg', 'src/views/images/*.png'])
        .pipe(plugins.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('views/images'));
});


/* ---------------------------------------------------------------------
 * | Main tasks                                                        |
 * ------------------------------------------------------------------- */

// Server
gulp.task('server', ['html', 'styles', 'images'], function () {
    // init browsersync
    browserSync.init({
        server: './',
        // tunnel: true,
        // open: 'tunnel',
        browser: 'google chrome canary'
    });
    // watch
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/css/*.css', ['styles']);
});

// Server pizza
gulp.task('server:pizza', ['pizza:html', 'pizza:styles', 'pizza:scripts', 'pizza:images'], function () {
    // init browsersync
    browserSync.init({
        server: {
            baseDir: 'views',
            index: 'pizza.html'
        },
        // tunnel: true,
        // open: 'tunnel',
        browser: 'google chrome canary'
    });
    // watch
    gulp.watch('src/views/pizza.html', ['pizza:html']);
    gulp.watch('src/views/css/*.css', ['pizza:styles']);
    gulp.watch('src/views/js/*.js', ['pizza:scripts']);
});

// Default
gulp.task('default', function () {
    // default task here
});

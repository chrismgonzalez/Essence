'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');



gulp.task('workflow', function() {
    gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}));
});



gulp.task('browserSync', function(){

    browserSync.init({
        server: {
            baseDir: './'

        },

       target: "localhost:8080", // can be [virtual host, sub-directory, localhost with port]
        ws: true // enables websockets
    });
});

//watch tasks -- complete watch tasks
gulp.task('watch', ['browserSync'] , function() {
    gulp.watch('./**/*.scss' , ['workflow']);
    gulp.watch('./**/*.html' , browserSync.reload);
});

gulp.task('default' , ['workflow', 'watch']);
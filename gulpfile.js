'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');



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
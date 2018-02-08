var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    bust = require('gulp-buster');

gulp.task('sass', function() {
    gulp.src('style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    	.pipe(gulp.dest('.'))
    	.pipe(rename({suffix: '.min'}))
    	.pipe(minifycss())
        .pipe(gulp.dest('.'));
});

gulp.task('bust', function() {
    gulp.src('css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('.'))
        .pipe(bust({ fileName: 'busters.json' }))
        .pipe(gulp.dest('.'));
});

gulp.task('analytics', function(){
    gulp.src(['js/analytics/google.js', 'js/analytics/bing.js'])
        .pipe(concat('analytics.js'))
        .pipe(gulp.dest('js/compile'))
        .pipe(rename('analytics.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
        .pipe(bust({ fileName: 'busters.json' }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch',function() {
    gulp.watch(['sass/**/*.scss'],['sass']);
});
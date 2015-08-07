var gulp = require('gulp'),
    useref = require('gulp-useref'),
    iff = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    del = require('del');

gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(iff('*.js', uglify()))
        .pipe(iff('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    // del(['dist']);
});

gulp.task('build', ['clean', 'html'], function() {
    return gulp.src([
        'app/images/*',
        'app/partials/*',
        'app/templates/*',
        'app/favicon.ico'
        ], {base:'app'})
    .pipe(gulp.dest('dist'));
});

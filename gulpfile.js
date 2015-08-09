var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    inject = require('gulp-inject'),
    del = require('del');

gulp.task('clean', function() {
    del.sync(['dist']);
});

gulp.task('html', function () {
    var templates = gulp.src('app/templates/*.html')
        .pipe(templateCache('templates.js', {
            root: 'templates',
            module: 'imslpApp'
    }));
    var assets = useref.assets({
        additionalStreams: [templates]
    });
    return gulp.src('app/*.html')
        .pipe(inject(templates, {relative: true}))
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'html'], function() {
    return gulp.src([
        'app/images/*',
        'app/.htaccess',
        'app/favicon.ico'
        ], {base:'app'})
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);

var gulp = require('gulp'),
    args = require('yargs').argv,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    inject = require('gulp-inject'),
    minifyHtml = require('gulp-minify-html'),
    del = require('del');

gulp.task('clean', function() {
    del.sync(['dist/**/*', 'dist/**/.*']);
});

gulp.task('html', function () {
    var templates = gulp.src('app/templates/*.html')
        .pipe(minifyHtml({empty:true}))
        .pipe(templateCache('templates.js', {
            root: 'templates',
            module: 'imslpApp'
        }));

    var assets = useref.assets({
        additionalStreams: [templates]
    });
    return gulp.src('app/*.html')
        .pipe(inject(templates, {relative:true}))
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

gulp.task('test', function(done) {
    var Server = require('karma').Server;
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: args.singlerun
    }, done).start();
});

gulp.task('help', function() {
    console.log('Usage: gulp <task> [options]');
    console.log('Tasks: gulp build');
    console.log('       gulp test [--singlerun]');
});

gulp.task('default', ['help']);

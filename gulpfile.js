var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

 
var paths = {
  sass: ['./scss/**/*.scss'],
  www : ['www/**/*.*'],
  appScripts: 'www/js/**/*.js'
};
 
gulp.task('default', ['sass']);
gulp.task('serve', ['watch']);
 
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
 
gulp.task('reload', function () {
  return gulp.src(['www/index.html'])
    .pipe(connect.reload());
});
 
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch([paths.www], ['reload']);
});
 
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .pipe(gulp.dest('./www/lib/'))
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });


});
 
gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('wiredep', function() {
  log('Wire up the bower css js and our app js into the index.html');
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

gulp.task('injectjs',['wiredep'], function(){
  var target = gulp.src('./www/index.html');
  var sources = gulp.src([paths.appScripts]);

  return target.pipe(inject(sources, {relative: true}))
      .pipe(gulp.dest('./www'));
});

////
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
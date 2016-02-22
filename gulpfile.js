'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var production = (process.env.NODE_ENV === 'production');

var config = function () {
  var jsDir = './client/js';
  var scssDir = './client/scss';

  var config = {
    jsDir: jsDir,
    jsFiles: [
      jsDir + '/**/*.js',
    ],
    appEntryFiles: [jsDir + '/main.js'],
    scssDir: scssDir,
    scssFiles: [
      scssDir + '/**/*.scss',
    ],
    destDir: './public/',
    bundleJsFile: 'client_spa.js',
  };

  return config;
}();

gulp.task('jshint', function() {
  return gulp.src(config.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}

function scripts(watch) {
  var bundler = browserify({
    entries: config.appEntryFiles,
    basedir: __dirname,
    debug: !production,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler);
  }

  //bundler.transform(reactify);
  //if(production) {
  //  bundler.transform({global: true}, uglifyify);
  //}

  var rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', handleError("Browserify"));
    stream = stream.pipe(source(config.bundleJsFile));
    return stream.pipe(gulp.dest(config.destDir + '/js'));
  };

  bundler.on('update', rebundle);
  return rebundle();
};

gulp.task('scripts:watch', function() {
  scripts(true);
});

gulp.task('scripts', function(cb) {
  scripts(false);
});

gulp.task('styles', function() {
  return gulp.src(config.scssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.destDir + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: './bin/www',
    watch:  [
      'app.js',
      'app/',
      'routes/',
      'views/'
    ],
    ext: 'html js json jade',
    port: 3000,
    nodeArgs: ['--debug'],
  }).on('start', function () {
    if (!started) {
      cb();
    }
    started = true;
  }).on('restart', function(files) {
    gutil.log('[server] App restarted due to: ', gutil.colors.cyan(files));
    // slight delay in browser reload, after restarting server
    setTimeout(function reload() {
      browserSync.reload({stream: false});
    }, 1000);
  });
});

gulp.task('develop', ['nodemon', 'styles', 'scripts:watch'], function() {
  browserSync.init(null, {
    // TODO sub-URL sync is not working
    proxy: 'http://localhost:3000',
    port: 3001,
    browser: ["google chrome"],
    logLevel: 'debug',
    //files: ["public/**/*.*", "app/**/*"],
  }, function(err, bs) {
    if(err) {
      gutil.log(err);
    }
  });
  gulp.watch(config.jsFiles, ['jshint']);
  gulp.watch(config.scssFiles, ['styles']);
});

gulp.task('default', ['develop'], function () {
});

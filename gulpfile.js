'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*", "app/**/*"],
    browser: ["google chrome"],
    port: 3001,
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: './bin/www',
    watch:  [
      'app.js',
      './bin/',
      './app/',
      './routes/'
    ],
    ext: 'js json',
    port: 3000,
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }

    setTimeout(browserSync.reload, 1000);
  });
});
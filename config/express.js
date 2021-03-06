var express = require('express');
var session = require('express-session');
var mongoStore = require('connect-mongo/es5')(session);
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');

module.exports = function (app, config) {

  app.set('showStackError', true);

  // should be placed before express.static
  app.use(compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))
  app.use(express.static(config.root + '/public'))

  // don't use logger for test env
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
  }

  // set views path, template engine and default layout
  app.set('views', path.join(config.root, 'views'));
  app.set('view engine', 'jade');
  app.locals.basedir = path.join(config.root, 'views');

  app.use(cookieParser());
  //app.use(bodyParser.json());
  app.use(bodyParser());
  app.use(methodOverride())
  app.use(session({
    secret: 'jsmc',
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }))
  app.use(flash());
  //app.use(favicon(__dirname + '/public/favicon.ico'));

  // Route Handlers
  app.use('/', require(config.root + '/routes/index'));
  app.use('/users', require(config.root + '/routes/users'));
  app.use('/queues', require(config.root + '/routes/queues'));

  // Error handlers
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err      // development > print stacktrace
      });
    });
  }
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}         // production > no stacktrace
    });
  });
};
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var  fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

// Bootstrap db connection
var mongoose = require('mongoose')
mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});

// express settings
var app = express();
require('./config/express')(app, config);


module.exports = app;

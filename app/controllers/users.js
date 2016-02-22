var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.list = function (req, res) {
  User.find({}, function (err, users) {
    res.render('users/index', { users: users });
  });
};

exports.update = function (req, res) {
  var user = new User(req.body);
  User.update({_id: user.id}, {first_name: user.first_name}, function (err, numberAffected, raw) {
    res.redirect('/users');
  });
};

exports.new = function(req, res) {
  res.render('users/new', { user: new User() });
}

exports.create = function (req, res) {
  var user = new User(req.body);
  user.save(function (err) {
    res.redirect('/users');
  });
};

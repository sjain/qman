var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.list = function (req, res) {
  res.format({
    html: function() {
      User.find({}, function (err, users) {
        res.render('users/index', { users: users });
      });
    },
  });
};

exports.json = function(req, res) {
  res.format({
    json: function () {
      console.log('rendering application/json');
      User.find({}, function(err, users) {
        console.log('users:', users);
        res.json(users);
      });
    },
  });
}

exports.edit = function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user) {
    res.render('users/new', { user: user });
  });
}

exports.update = function (req, res) {
  User.findOne({_id: req.params.id}, function (err, user){
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.save(function (err) {
      if(err) {
        res.render('users/new', { user: user });
      } else {
        res.redirect('/users');
      }
    });
  });
};

exports.new = function(req, res) {
  res.render('users/new', { user: new User() });
}

exports.create = function (req, res) {
  var user = new User(req.body);
  user.save(function (err) {
    if(err) {
      res.render('users/new', { user: user });
    } else {
      res.redirect('/users');
    }
  });
};

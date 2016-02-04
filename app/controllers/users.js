var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.list = function (req, res) {
  User.find({}, function (err, teams) {
    res.json(teams);
  });
};

exports.update = function (req, res) {
  var user = new User(req.body);
  User.update({_id: user.id}, {first_name: user.first_name}, function (err, numberAffected, raw) {
    var socketIO = global.socketIO;
    socketIO.sockets.emit('user:updated', user);
    res.json(true);
  });
};

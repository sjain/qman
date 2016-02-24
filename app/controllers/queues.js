var mongoose = require('mongoose');
var Queue = mongoose.model('Queue');

exports.list = function (req, res) {
  Queue.find({}, function (err, queues) {
    res.render('queues/index', { queues: queues });
  });
};

exports.edit = function(req, res) {
  Queue.findOne({_id: req.params.id}, function(err, queue) {
    res.render('queues/new', { queue: queue });
  });
}

exports.update = function (req, res) {
  Queue.findOne({_id: req.params.id}, function (err, queue){
    queue.name = req.body.name;
    queue.save(function (err) {
      if(err) {
        res.render('queues/new', { queue: queue });
      } else {
        res.redirect('/queues');
      }
    });
  });
};

exports.new = function(req, res) {
  res.render('queues/new', { queue: new Queue() });
}

exports.create = function (req, res) {
  var queue = new Queue(req.body);
  queue.save(function (err) {
    if(err) {
      res.render('queues/new', { queue: queue });
    } else {
      res.redirect('/queues');
    }
  });
};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QueueSchema = new Schema({
  name: {
    type: String,
    required: "Name is required"
  },
});

mongoose.model('Queue', QueueSchema);

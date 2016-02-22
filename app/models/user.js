var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: {
    type: String,
    required: "First Name is required"
  },
  last_name: {
    type: String,
    required: "Last Name is required"
  },
  email: {
    type: String,
    required: false
  },
});

UserSchema.path('email').validate(function (email) {
  console.log('email:', email);
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'Please enter a valid email address.')

mongoose.model('User', UserSchema);

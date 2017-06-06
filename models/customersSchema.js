var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema ({
  Firstname: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Lastname: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
});

var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

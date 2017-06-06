var mongoose = require('mongoose');

var salesmenSchema = new mongoose.Schema ({
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
  Experience: {
    type: Number,
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
})

var Salesmen = mongoose.model('employee', salesmenSchema);
module.exports = Salesmen;

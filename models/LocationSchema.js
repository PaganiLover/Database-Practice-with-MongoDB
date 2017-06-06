var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema ({
  State: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  City: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Zip: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Full: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
});

var Locations = mongoose.model('Location', locationSchema);
module.exports = Locations;

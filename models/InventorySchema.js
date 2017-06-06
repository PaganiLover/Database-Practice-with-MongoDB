var mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema ({
  Make: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Model: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Year: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Price: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
});

var Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema ({
  EventName: {
    type: String,
    required: true,
    unique: false
  },
  EventDate: {
    type: String,
    required: true,
    unique: false
  },
  EventTime: {
    type: String,
    required: true,
    unique: false
  },
  EventPrice: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
})

var NewEvent = mongoose.model('event', eventSchema);
module.exports = NewEvent;

const mongoose = require('mongoose');
const WineSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  brewery: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  grapes: {
    type: String,
    default: ''
  },
  region: {
    type: String,
    default: ''
  },
  alcohol: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },

  price: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    default: ''
  },
  stock: {
    type: Boolean,
    default: true
  },
  new: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
 
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wine', WineSchema);
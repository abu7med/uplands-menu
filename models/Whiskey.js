const mongoose = require('mongoose');
const WhiskeySchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  type: {
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
  stock: {
    type: Boolean,
    default: true
  },
  new: {
    type: Boolean,
    default: false
  },

  price: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Whiskey', WhiskeySchema);
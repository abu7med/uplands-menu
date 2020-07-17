const mongoose = require('mongoose');
const BeerSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  brewery: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  alcohol: {
    type: Number,
    default: 0
  },
  ibu: {
    type: Number,
    default: 0
  },

  location: {
    type: String,
    default: ''
  },

  form: {
    type: String,
    default: ''
  },

  size: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Beer', BeerSchema);
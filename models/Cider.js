const mongoose = require('mongoose');
const CiderSchema = new mongoose.Schema({
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
  untappd: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  price: {
    type: String,
    default: ''
  },
  alcohol: {
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
  stock: {
    type: Boolean,
    default: true
  },
  new: {
    type: Boolean,
    default: false
  },

  size: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cider', CiderSchema);
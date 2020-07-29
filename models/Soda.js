const mongoose = require('mongoose');
const SodaSchema = new mongoose.Schema({
  title: {
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

  price: {
    type: Number,
    default: 0
  },

  location: {
    type: String,
    default: ''
  },

  stock: {
    type: Boolean,
    default: true
  },
  form: {
    type: String,
    default: ''
  },

  size: {
    type: String,
    default: ''
  },

  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Soda', SodaSchema);
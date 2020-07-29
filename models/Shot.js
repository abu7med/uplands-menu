const mongoose = require('mongoose');
const ShotSchema = new mongoose.Schema({
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
  image: {
    type: String,
    default: ''
  },

  price: {
    type: Number,
    default: 0
  },
  stock: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Shot', ShotSchema);
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
<<<<<<< HEAD
  location: {
    type: String,
    default: ""
  },
  form: {
    type: String,
    default: ""
  },
=======

  location: {
    type: String,
    default: ''
  },

  form: {
    type: String,
    default: ''
  },

>>>>>>> f5f5bf860b2fce74f9f571fbf432ea9965cc9bea
  size: {
    type: Number,
    default: 0
  },
<<<<<<< HEAD
=======

>>>>>>> f5f5bf860b2fce74f9f571fbf432ea9965cc9bea
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Beer', BeerSchema);
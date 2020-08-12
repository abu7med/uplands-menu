const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
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
  ingredients: {
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

module.exports = mongoose.model('Food', FoodSchema);
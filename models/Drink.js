const mongoose = require('mongoose');
const DrinkSchema = new mongoose.Schema({
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

  price: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  ingredients: {
    type: String,
    default: ''
  },
 
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Drink', DrinkSchema);
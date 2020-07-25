const mongoose = require('mongoose');
const BoardgameSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  playingtime: {
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
  rank: {
    type: Number,
    default: 0
  },
  players: {
    type: String,
    default: 0
  },
  language: {
    type: String,
    default: ''
  },

  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Boardgame', BoardgameSchema);
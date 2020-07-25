const Boardgame = require('../../models/Boardgame');

var fs      = require('fs');
var request = require('request');

module.exports = (app) => {

  app.get('/api/get/boardgames', function (req, res, next) {
    Boardgame.find({}, function(err, boardgames) {
      var boardgameMap = {};
  
      boardgames.forEach(function(boardgame) {
        boardgameMap[boardgame._id] = boardgame;
      });
  
      res.send(boardgameMap);  
    });
  });

  app.post('/api/edit/boardgames', function (req, res, next) {

    Boardgame.findByIdAndUpdate(req.body.boardgameID,
      {title: req.body.boardgameTitle,
        playingtime: req.body.boardgamePlayingtime, 
        description : req.body.boardgameDescription,
        type : req.body.boardgameType,
        rank : req.body.boardgameRank,
        players : req.body.boardgamePlayers,
        language : req.body.boardgameLanguage,
        image : req.body.boardgameImage,

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Boardgame.find({}, function(err, boardgames) {
          var boardgameMap = {};
      
          boardgames.forEach(function(boardgame) {
            boardgameMap[boardgame._id] = boardgame;
          });
      
          res.send(boardgameMap);  
        });
      }

  })
    //
  });
  

  app.delete('/api/delete/boardgames', function (req, res) {

    req.body.forEach(element => Boardgame.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/boardgames', function (req, res, next) {

    const newBoardgame = new Boardgame();
    newBoardgame.title = req.body.boardgameTitle;
    newBoardgame.playingtime = req.body.boardgamePlayingtime; 
    newBoardgame.description = req.body.boardgameDescription;
    newBoardgame.type = req.body.boardgameType;
    newBoardgame.rank = req.body.boardgameRank;
    newBoardgame.players = req.body.boardgamePlayers;
    newBoardgame.language = req.body.boardgameLanguage;
    newBoardgame.image = req.body.boardgameImage;
    newBoardgame.save((err, boardgame) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(boardgame);
    });
  });


};

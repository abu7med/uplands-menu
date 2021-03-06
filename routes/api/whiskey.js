const Whiskey = require('../../models/Whiskey');

var request = require('request');

module.exports = (app) => {

  app.get('/api/get/whiskeys', function (req, res, next) {
    Whiskey.find({}, function(err, whiskeys) {
      var whiskeyMap = {};
  
      whiskeys.forEach(function(whiskey) {
        whiskeyMap[whiskey._id] = whiskey;
      });
  
      res.send(whiskeyMap);  
    });
  });

  app.post('/api/edit/whiskeys', function (req, res, next) {

    Whiskey.findByIdAndUpdate(req.body.whiskeyID,
      {title: req.body.whiskeyTitle,
        type : req.body.whiskeyType,
        price : req.body.whiskeyPrice,
        description : req.body.whiskeyDescription,
        location : req.body.whiskeyLocation,
        alcohol : req.body.whiskeyAlcohol,
        stock : req.body.whiskeyStock,
        new : req.body.whiskeyNew,
        country : req.body.whiskeyCountry,
        image : req.body.whiskeyImage,

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Whiskey.find({}, function(err, whiskeys) {
          var whiskeyMap = {};
      
          whiskeys.forEach(function(whiskey) {
            whiskeyMap[whiskey._id] = whiskey;
          });
      
          res.send(whiskeyMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/whiskeys', function (req, res) {

    req.body.forEach(element => Whiskey.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/whiskeys', function (req, res, next) {


    const newWhiskey = new Whiskey();
    newWhiskey.title = req.body.whiskeyTitle;
    newWhiskey.type = req.body.whiskeyType;
    newWhiskey.price = req.body.whiskeyPrice;
    newWhiskey.description = req.body.whiskeyDescription;
    newWhiskey.location = req.body.whiskeyLocation;
    newWhiskey.alcohol = req.body.whiskeyAlcohol;
    newWhiskey.stock = req.body.whiskeyStock;
    newWhiskey.new = req.body.whiskeyNew;
    newWhiskey.image = req.body.whiskeyImage;
    newWhiskey.country = req.body.whiskeyCountry;
    // newWhiskey.image = '../../images/whiskeys/' + req.body.whiskeyTitle + '.jpeg';
    newWhiskey.save((err, whiskey) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(whiskey);
    });
  });

 
};

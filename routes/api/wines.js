const Wine = require('../../models/Wine');

var request = require('request');

module.exports = (app) => {

  app.get('/api/get/wines', function (req, res, next) {
    Wine.find({}, function(err, wines) {
      var wineMap = {};
  
      wines.forEach(function(wine) {
        wineMap[wine._id] = wine;
      });
  
      res.send(wineMap);  
    });
  });

  app.post('/api/edit/wines', function (req, res, next) {

    Wine.findByIdAndUpdate(req.body.wineID,
      {title: req.body.wineTitle,
        type : req.body.wineType,
        brewery : req.body.wineBrewery,
        price : req.body.winePrice,
        size : req.body.wineSize,
        description : req.body.wineDescription,
        alcohol : req.body.wineAlcohol,
        stock : req.body.wineStock,
        country : req.body.wineCountry,
        new : req.body.wineNew,
        image : req.body.wineImage,
        location : req.body.wineLocation,

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Wine.find({}, function(err, wines) {
          var wineMap = {};
      
          wines.forEach(function(wine) {
            wineMap[wine._id] = wine;
          });
      
          res.send(wineMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/wines', function (req, res) {

    req.body.forEach(element => Wine.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/wines', function (req, res, next) {


    const newWine = new Wine();
    newWine.title = req.body.wineTitle;
    newWine.type = req.body.wineType;
    newWine.brewery = req.body.wineBrewery;
    newWine.size = req.body.wineSize;
    newWine.price = req.body.winePrice;
    newWine.location = req.body.wineLocation;
    newWine.description = req.body.wineDescription;
    newWine.alcohol = req.body.wineAlcohol;
    newWine.stock = req.body.wineStock;
    newWine.new = req.body.wineNew;
    newWine.image = req.body.wineImage;
    newWine.country = req.body.wineCountry;
    // newWine.image = '../../images/wines/' + req.body.wineTitle + '.jpeg';
    newWine.save((err, wine) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(wine);
    });
  });

 
};

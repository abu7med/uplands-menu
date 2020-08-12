const Shot = require('../../models/Shot');

var request = require('request');

module.exports = (app) => {

  app.get('/api/get/shots', function (req, res, next) {
    Shot.find({}, function(err, shots) {
      var shotMap = {};
  
      shots.forEach(function(shot) {
        shotMap[shot._id] = shot;
      });
  
      res.send(shotMap);  
    });
  });

  app.post('/api/edit/shots', function (req, res, next) {

    Shot.findByIdAndUpdate(req.body.shotID,
      {title: req.body.shotTitle,
        type : req.body.shotType,
        price : req.body.shotPrice,
        stock : req.body.shotStock,
        country : req.body.shotCountry,
        new : req.body.shotNew,
        description : req.body.shotDescription,
        alcohol : req.body.shotAlcohol,
        brewery : req.body.shotBrewery,
        image : req.body.shotImage,

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Shot.find({}, function(err, shots) {
          var shotMap = {};
      
          shots.forEach(function(shot) {
            shotMap[shot._id] = shot;
          });
      
          res.send(shotMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/shots', function (req, res) {

    req.body.forEach(element => Shot.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/shots', function (req, res, next) {


    const newShot = new Shot();
    newShot.title = req.body.shotTitle;
    newShot.type = req.body.shotType;
    newShot.price = req.body.shotPrice;
    newShot.stock = req.body.shotStock;
    newShot.new = req.body.shotNew;
    newShot.country = req.body.shotCountry;
    newShot.location = req.body.shotLocation;
    newShot.description = req.body.shotDescription;
    newShot.alcohol = req.body.shotAlcohol;
    newShot.brewery = req.body.shotBrewery;
    newShot.image = req.body.shotImage;
    // newShot.image = '../../images/shots/' + req.body.shotTitle + '.jpeg';
    newShot.save((err, shot) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(shot);
    });
  });

 
};

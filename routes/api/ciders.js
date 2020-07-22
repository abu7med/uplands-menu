const Cider = require('../../models/Cider');

var request = require('request');

module.exports = (app) => {

  app.get('/api/get/ciders', function (req, res, next) {
    Cider.find({}, function(err, ciders) {
      var ciderMap = {};
  
      ciders.forEach(function(cider) {
        ciderMap[cider._id] = cider;
      });
  
      res.send(ciderMap);  
    });
  });

  app.post('/api/edit/ciders', function (req, res, next) {

    Cider.findByIdAndUpdate(req.body.ciderID,
      {title: req.body.ciderTitle,
        brewery : req.body.ciderBrewery, 
        description : req.body.ciderDescription,
        type : req.body.ciderType,
        rating : req.body.ciderRating,
        price : req.body.ciderPrice,
        alcohol : req.body.ciderAlcohol,
        ibu : req.body.ciderIBU,
        size : req.body.ciderSize,
        form : req.body.ciderForm,
        location : req.body.ciderLocation,
        image : req.body.ciderImage,
        untappd : req.body.ciderUntappd,
        country : req.body.ciderCountry

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Cider.find({}, function(err, ciders) {
          var ciderMap = {};
      
          ciders.forEach(function(cider) {
            ciderMap[cider._id] = cider;
          });
      
          res.send(ciderMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/ciders', function (req, res) {

    req.body.forEach(element => Cider.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/ciders', function (req, res, next) {


    const newCider = new Cider();
    newCider.title = req.body.ciderTitle;
    newCider.brewery = req.body.ciderBrewery; 
    newCider.description = req.body.ciderDescription;
    newCider.type = req.body.ciderType;
    newCider.rating = req.body.ciderRating;
    newCider.price = req.body.ciderPrice;
    newCider.alcohol = req.body.ciderAlcohol;
    newCider.ibu = req.body.ciderIBU;
    newCider.form = req.body.ciderForm;
    newCider.location = req.body.ciderLocation;
    newCider.size = req.body.ciderSize;
    newCider.image = req.body.ciderImage;
    newCider.untappd = req.body.ciderUntappd;
    newCider.country = req.body.ciderCountry;
    // newCider.image = '../../images/ciders/' + req.body.ciderTitle + '.jpeg';
    newCider.save((err, cider) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(cider);
    });
  });

 
};

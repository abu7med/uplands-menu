const Soda = require('../../models/Soda');

var request = require('request');

module.exports = (app) => {

  app.get('/api/get/sodas', function (req, res, next) {
    Soda.find({}, function(err, sodas) {
      var sodaMap = {};
  
      sodas.forEach(function(soda) {
        sodaMap[soda._id] = soda;
      });
  
      res.send(sodaMap);  
    });
  });

  app.post('/api/edit/sodas', function (req, res, next) {

    Soda.findByIdAndUpdate(req.body.sodaID,
      {title: req.body.sodaTitle,
        type : req.body.sodaType,
        price : req.body.sodaPrice,
        size : req.body.sodaSize,
        form : req.body.sodaForm,
        stock : req.body.sodaStock,
        location : req.body.sodaLocation,
        image : req.body.sodaImage,

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Soda.find({}, function(err, sodas) {
          var sodaMap = {};
      
          sodas.forEach(function(soda) {
            sodaMap[soda._id] = soda;
          });
      
          res.send(sodaMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/sodas', function (req, res) {

    req.body.forEach(element => Soda.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/sodas', function (req, res, next) {


    const newSoda = new Soda();
    newSoda.title = req.body.sodaTitle;
    newSoda.type = req.body.sodaType;
    newSoda.price = req.body.sodaPrice;
    newSoda.form = req.body.sodaForm;
    newSoda.stock = req.body.sodaStock;
    newSoda.location = req.body.sodaLocation;
    newSoda.size = req.body.sodaSize;
    newSoda.image = req.body.sodaImage;
    // newSoda.image = '../../images/sodas/' + req.body.sodaTitle + '.jpeg';
    newSoda.save((err, soda) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(soda);
    });
  });

 
};

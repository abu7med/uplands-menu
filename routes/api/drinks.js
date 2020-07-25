const Drink = require('../../models/Drink');

var request = require('request');

module.exports = (app) => {

  app.get('/api/get/drinks', function (req, res, next) {
    Drink.find({}, function(err, drinks) {
      var drinkMap = {};
  
      drinks.forEach(function(drink) {
        drinkMap[drink._id] = drink;
      });
  
      res.send(drinkMap);  
    });
  });

  app.post('/api/edit/drinks', function (req, res, next) {

    Drink.findByIdAndUpdate(req.body.drinkID,
      {title: req.body.drinkTitle,
        type : req.body.drinkType,
        price : req.body.drinkPrice,
        description : req.body.drinkDescription,
        form : req.body.drinkForm,
        ingredients : req.body.drinkIngredients,
        image : req.body.drinkImage,

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Drink.find({}, function(err, drinks) {
          var drinkMap = {};
      
          drinks.forEach(function(drink) {
            drinkMap[drink._id] = drink;
          });
      
          res.send(drinkMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/drinks', function (req, res) {

    req.body.forEach(element => Drink.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/drinks', function (req, res, next) {


    const newDrink = new Drink();
    newDrink.title = req.body.drinkTitle;
    newDrink.type = req.body.drinkType;
    newDrink.price = req.body.drinkPrice;
    newDrink.location = req.body.drinkLocation;
    newDrink.description = req.body.drinkDescription;
    newDrink.ingredients = req.body.drinkIngredients;
    newDrink.image = req.body.drinkImage;
    // newDrink.image = '../../images/drinks/' + req.body.drinkTitle + '.jpeg';
    newDrink.save((err, drink) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(drink);
    });
  });

 
};

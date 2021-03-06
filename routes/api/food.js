const Food = require('../../models/Food');

var request = require('request');

module.exports = (app) => {

  app.get('/api/get/foods', function (req, res, next) {
    Food.find({}, function(err, foods) {
      var foodMap = {};
  
      foods.forEach(function(food) {
        foodMap[food._id] = food;
      });
  
      res.send(foodMap);  
    });
  });

  app.post('/api/edit/foods', function (req, res, next) {

    Food.findByIdAndUpdate(req.body.foodID,
      {title: req.body.foodTitle,
        type : req.body.foodType,
        price : req.body.foodPrice,
        stock : req.body.foodStock,
        extra : req.body.foodExtra,
        vegan : req.body.foodVegan,
        vegetarian : req.body.foodVegetarian,
        glutenfree : req.body.foodGlutenfree,
        new : req.body.foodNew,
        ingredients : req.body.foodIngredients,
        description : req.body.foodDescription,
        vegandescription : req.body.foodVegandescription,
        glutenfreedescription : req.body.foodGlutenfreedescription,
        available : req.body.foodAvailable,
        image : req.body.foodImage,

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Food.find({}, function(err, foods) {
          var foodMap = {};
      
          foods.forEach(function(food) {
            foodMap[food._id] = food;
          });
      
          res.send(foodMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/foods', function (req, res) {

    req.body.forEach(element => Food.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/foods', function (req, res, next) {


    const newFood = new Food();
    newFood.title = req.body.foodTitle;
    newFood.type = req.body.foodType;
    newFood.price = req.body.foodPrice;
    newFood.stock = req.body.foodStock;
    newFood.extra = req.body.foodExtra;
    newFood.vegan = req.body.foodVegan;
    newFood.vegetarian = req.body.foodVegetarian;
    newFood.glutenfree = req.body.foodGlutenfree;
    newFood.new = req.body.foodNew;
    newFood.ingredients = req.body.foodIngredients;
    newFood.description = req.body.foodDescription;
    newFood.vegandescription = req.body.foodVegandescription;
    newFood.glutenfreedescription = req.body.foodGlutenfreedescription;
    newFood.available = req.body.foodAvailable;
    newFood.image = req.body.foodImage;
    // newFood.image = '../../images/foods/' + req.body.foodTitle + '.jpeg';
    newFood.save((err, food) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(food);
    });
  });

 
};

const Beer = require('../../models/Beer');

var fs      = require('fs');
var request = require('request');

module.exports = (app) => {
  app.get('/api/items', (req, res, next) => {
    Counter.find()
      .exec()
      .then((counter) => res.json(counter))
      .catch((err) => next(err));
  });

  app.get('/api/get/beers', function (req, res, next) {
    Beer.find({}, function(err, beers) {
      var beerMap = {};
  
      beers.forEach(function(beer) {
        beerMap[beer._id] = beer;
      });
  
      res.send(beerMap);  
    });
  });

  app.post('/api/edit/beers', function (req, res, next) {

    Beer.findByIdAndUpdate(req.body.beerID,
      {title: req.body.beerTitle,
        brewery : req.body.beerBrewery, 
        description : req.body.beerDescription,
        type : req.body.beerType,
        glutenfree : req.body.beerGlutenfree,
        rating : req.body.beerRating,
        price : req.body.beerPrice,
        alcohol : req.body.beerAlcohol,
        ibu : req.body.beerIBU,
        size : req.body.beerSize,
        form : req.body.beerForm,
        location : req.body.beerLocation,
        image : req.body.beerImage,
        stock : req.body.beerStock,
        new : req.body.beerNew,
        untappd : req.body.beerUntappd,
        country : req.body.beerCountry

    }, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        Beer.find({}, function(err, beers) {
          var beerMap = {};
      
          beers.forEach(function(beer) {
            beerMap[beer._id] = beer;
          });
      
          res.send(beerMap);  
        });
        // console.log(result)
        //   res.send(result)
      }

  })
    //
  });
  

  app.delete('/api/delete/beers', function (req, res) {

    req.body.forEach(element => Beer.findByIdAndDelete(element, function (err) {
      if(err) console.log(err);
}));


  });

  app.post('/api/add/beers', function (req, res, next) {

  //   request({
  //     url : req.body.beerImage,
  //     //make the returned body a Buffer
  //     encoding : null
  // }, function(error, response, body) {
  
  //     //will be true, body is Buffer( http://nodejs.org/api/buffer.html )
  
  //     //do what you want with body
  //     //like writing the buffer to a file
  //     fs.writeFile('./build/images/beers/' + req.body.beerTitle + '.jpeg', body, {
  //         encoding : null
  //     }, function(err) {
  
  //         if (err)
  //             throw err;
  //     });
  
  // });
    const newBeer = new Beer();
    newBeer.title = req.body.beerTitle;
    newBeer.brewery = req.body.beerBrewery; 
    newBeer.description = req.body.beerDescription;
    newBeer.glutenfree = req.body.beerGlutenfree;
    newBeer.type = req.body.beerType;
    newBeer.rating = req.body.beerRating;
    newBeer.price = req.body.beerPrice;
    newBeer.alcohol = req.body.beerAlcohol;
    newBeer.ibu = req.body.beerIBU;
    newBeer.form = req.body.beerForm;
    newBeer.location = req.body.beerLocation;
    newBeer.size = req.body.beerSize;
    newBeer.stock = req.body.beerStock;
    newBeer.new = req.body.beerNew;
    newBeer.image = req.body.beerImage;
    newBeer.untappd = req.body.beerUntappd;
    newBeer.country = req.body.beerCountry;
    // newBeer.image = '../../images/beers/' + req.body.beerTitle + '.jpeg';
    newBeer.save((err, beer) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send(beer);
    });
  });

  app.post('/api/items', function (req, res, next) {
    const counter = new Counter();

    counter.save()
      .then(() => res.json(counter))
      .catch((err) => next(err));
  });

  app.delete('/api/items/:id', function (req, res, next) {
    Counter.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((counter) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/items/:id/increment', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count++;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/items/:id/decrement', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count--;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

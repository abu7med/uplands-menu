
const express = require('express');
const express_enforces_ssl = require('express-enforces-ssl');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.enable('trust proxy');
 
app.use(express_enforces_ssl());
// var whitelist = ['localhost']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// Then pass them to cors:


const port = process.env.PORT || 5000;
mongoose.connect("mongodb://uplands:0lL2QzBCBzBg@ds035059.mlab.com:35069/heroku_2g32cfm6", {useNewUrlParser: true});;
require('./routes')(app);


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`app is listening to PORT ${port}`)
  })
module.exports = app;


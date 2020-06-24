const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
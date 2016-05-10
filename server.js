var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 1313;

// Body-parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
  next();
});

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

// MongoLab URI
var mongoUri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds030719.mlab.com:30719/jarvis';

// CONNECT TO MONGOLAB
mongoose.connect(mongoUri, options);
mongoose.set('debug', true);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('API Connected to MongoLab Jarvis DB');
});

// ROOT ROUTES
app.get('/', function(req, res) {
  res.send("Jarvis api home page");
});


// Expose apiRouter
app.use('/api', require('./api.router'));

// START SERVER
app.listen(port);
console.log('Magic is happening on port ' + port);

// ***********************************
// Start with $nodemon server.js
// ***********************************

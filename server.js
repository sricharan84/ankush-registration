// set up ======================================================================
var express = require('express');
var path = require('path');
var app = express(); 						// create our app w/ express
var fs = require('fs');
var multer = require('multer');
// var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(database.remoteUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

//Configuration to MongoDB atlas ===================================================
// MongoClient.connect(database.remoteUrl, function(err, db){
//     console.log('Db callback');
//     //db.close();
//     db.createCollection("TODO", );
// });

app.use(function (req, res, next) {

  res.header("access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Accept, Content-Type, Authorization, sid")
  res.header("Access-Control-Allow-Methods","GET, POST, PUT, OPTIONS, DELETE");
  next();
} )

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
// app.use('/node_modules',express.static(__dirname + './node_modules'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function(req, file, cb) {
      cb(null, req.body.candidateName+'_'+req.body.aadharNumber+'_'+file.originalname);
    }
});
 
var upload = multer({
 storage: storage
});

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app, upload);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

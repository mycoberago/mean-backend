var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');


// require controllers
//. serving an object containing functions
var auth = require('./controllers/auth.js');
var message = require('./controllers/message.js');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors.js');


/*  MIDDLEWARE  */

//  allows the server to read json data that is sent
app.use(bodyParser.json());
//  CORS cross origin resource sharing
app.use(cors);



/*  REQUESTS */

//  provides the api for all of the data in raw format
app.get('/api/message', message.get);

// receive message on the backend
app.post('/api/message', checkAuthenticated, message.post);

//. auth registration endpoint
//. when submit is clicked in the registration form this grabs post method
app.post('/auth/register', auth.register);



/*  CONNECTION  */

// first param is err and second is reference to the database
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
	if(!err){
		console.log("we are connected to mongo!");
		
		//  assign db to database
		database = db;
	}else{
		console.log(err);
	}
});

var server = app.listen(5000, function(){
	console.log("listening on port", server.address().port);
});
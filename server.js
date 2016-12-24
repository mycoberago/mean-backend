var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

var database;

//  allows the server to read json data that is sent
app.use(bodyParser.json());

//  CORS cross origin resource sharing
app.use(function(req,res,next){
	//  allow access from any location
	res.header("Access-Control-Allow-Origin", "*");

	//  determine what type of header is allowed...allow any headers of content type
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	
	next();  // prevents any freezing of middleware chain
});

// receive message on the backend
app.post('/api/message',function(req,res){
	console.log(req.body);

	//. req.body contains the object of the message from the front end
	database.collection('messages').insertOne(req.body);


	res.status(200);
});

// first param is err and second is reference to the database
mongo.connect("mongodb://localhost:27017/test", function(err,db){
	if(!err){
		console.log("we are connected to mongo!");
		database = db;
	}
});

var server = app.listen(5000, function(){
	console.log("listening on port", server.address().port);
});
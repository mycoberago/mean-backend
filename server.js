var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//  schema and model of js object in mongoose in order to send and retrieve messages
var Message = mongoose.model('Message', {
	msg: String
});

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

	//  use database to insert collected information from form
	var message = new Message(req.body);

	message.save();  //  save data to database


	res.status(200);
});

function GetMessages() {
	Message.find({}).exec(function(err,result){
		console.log(result);
	});
}

// first param is err and second is reference to the database
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
	if(!err){
		console.log("we are connected to mongo!");
		GetMessages();  //  use the GetMessages function to log the result from the database

		//  assign db to database
		database = db;
	}else{
		console.log(err);
	}
});

var server = app.listen(5000, function(){
	console.log("listening on port", server.address().port);
});
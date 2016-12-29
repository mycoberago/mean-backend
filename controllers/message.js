// require message model
var Message = require('../models/message');

module.exports = {
	//  this function grabs message from the mongoose model
	get:  function (req,res) {

		//  attach user info to message using populate()
	     Message.find({}).populate('user','-pwd').exec(function(err,result){
		 	res.send(result);
	     });
    },
	post: function(req,res){
		console.log(req.body, req.user);

		//  add user to req.body.user since authentication middleware gives access to it
		req.body.user = req.user;

		//  use database to insert collected information from form
		var message = new Message(req.body);

		message.save();  //  save data to database


		res.status(200);
    }
}
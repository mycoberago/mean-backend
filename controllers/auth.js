// require user model
var User = require('../models/user');
// token authenticator
var jwt = require('jwt-simple');
// moment library
var moment = require('moment');

module.exports = {
	register: function(req,res){
		console.log(req.body);

		//. check if the user already exist
		User.findOne({email: req.body.email}, function(err,existingUser){

			// check if user exist
			if(existingUser){
				//. 409 lets user know there is a conflict
				return res.status(409).send({message: 'Email is already registered'});
			}

			// save user through the model
			// the User object that through the model with email and password
			var user = new User(req.body);

			user.save(function(err,result){

				console.log(result);

				if(err){
					res.status(500).send({
						message: err.message
					});
				}
				//. when user is created...send token property
				res.status(200).send({token: createToken(result)});
			});

		});// User.findOne function

	
	},

	login: function(req,res){
		User.findOne({email: req.body.email}, function(err,user){
			
			//  if cannot find user
			// check if user exist
			if(!user){
				//. 409 lets user know there is a conflict
				return res.status(401).send({message: 'Email or Password Invalid'});
			}

			//  check if password matches the database login request
			if(req.body.pwd == user.pwd){
				res.send({token: createToken(user)});
			} else {
				return res.status(401).send({message: "Invalid email and/or password"});
			}

		});
	}
}

//  token is attached to header of every request
function createToken(user){
	var payload = {
		sub: user._id, // subject
		iat: moment().unix(),  // issue at time
		exp: moment().add(14,'days').unix() //  token to expire in 14 days
	};

	return jwt.encode(payload, 'secret'); // the secret should be in config file as more elaborate in production 
}
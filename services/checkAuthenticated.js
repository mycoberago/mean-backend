var jwt = require('jwt-simple');
var moment = require('moment');



module.exports = function checkAuthenticated(req,res,next){
	if(!req.header('Authorization')){
		return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
	}

	// grab token from the header
	var token = req.header('Authorization').split(' ')[1];

	// decode token
	var payload = jwt.decode(token,'secret');

	//  check if token has expired
	if(payload.exp <= moment().unix()){
		return res.status(401).send({message: 'Token has expired'});
	}

	//  save user within the payload
	req.user = payload.sub;

	//  finishes off the middleware
	next();
}
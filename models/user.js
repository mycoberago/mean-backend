
var mongoose = require('mongoose');

//  schema and model of js object in mongoose in order to send and retrieve messages
module.exports = mongoose.model('User', {
	email: String,
	pwd: String
});
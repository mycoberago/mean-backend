//  CORS middleware
module.exports = function(req,res,next){
	//  allow access from any location
	res.header("Access-Control-Allow-Origin", "*");

	//  determine what type of header is allowed...allow any headers of content type
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	
	next();  // prevents any freezing of middleware chain
}
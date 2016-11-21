// Pharmacist main

var index = require('../index')

var app = index.app
var exphbs = index.exphbs;
var express = index.express;
var path = index.path;

app.use("/login/client/", express.static(__dirname + '/client/'));
//console.log("__dirname = %s", path.resolve(__dirname));

// HTTP Requests
app.get('/', (request, response) => {  
  response.sendFile(__dirname + '/client/login.html')
})

app.post('/login',(request,response) => {
	//Login Validation
	// Fetch Username bucket and get the object using the username


	// Open the Portal if the user exists

})


app.post('/register',(request,response) => {
	//Validate username:
		//Limit the size of username

	//Validate password:


	//Fetch Username bucket
	//Fetch Riak Object


	//Update the Object with storing password and email in a JSON format

	// Send a new html page

})
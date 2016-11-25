var index = require('../index')

var app = index.app
var exphbs = index.exphbs;
var express = index.express;
var path = index.path;

app.use("/pharmacist/client/", express.static(__dirname + '/client/'));

var index = require('../index')
var app = index.app
var exphbs = index.exphbs;
var express = index.express;
var path = index.path;
var bodyParser = require('body-parser')
var assert = require('assert');
var async = require('async');
var logger = require('winston');
var fs = require('fs');
var http = require('http');
var Riak = require('basho-riak-client');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('view engine', 'ejs');
app.use("/login/client/", express.static(__dirname + '/client/'));

app.set('view engine', 'ejs');
var nodes = [
    '10.136.16.206:8098',
    '10.136.16.206:8087'
];

// creating a node and pinging
var client = new Riak.Client(nodes, function (err, c) {
});

client.ping(function (err, rslt) {
    if (err) {
        throw new Error(err);
    } else {
        // On success, ping returns true
        console.log('Riak succesfully connected')
        assert(rslt === true);
    }
});



//response.sendFile(__dirname + '/client/login.html')
  app.get('/ph_review', (request,response) => {
    console.log('in pharmacist post');
    console.log(request.query.phreview_search);
    client.fetchValue({ bucket: 'prescription', key:request.query.phreview_search, convertToJs: true },
        function (err, rslt) {
            if (err) {
                response.redirect('/invalid')
            } else {

                var riakObj = rslt.values.shift();
                var bashoman = riakObj.value;
                console.log(bashoman);
                //response.send(request.body);
                // render a page and print the prescription out.
                response.render('pharmacist_portal', {email :  bashoman.emailAddress,pname:bashoman.patientName, dname:bashoman.doctorName, cname:bashoman.clinicName, date:bashoman.date, pmed:bashoman.prescription, oinfo:bashoman.other });
              }

            }
    );


  // POST Requests
});

app.get('/invalid', (request,response) => {
  console.log('invalid username in phar post');
  console.log(request.query.phreview_search);

              response.sendFile(__dirname + '/client/invalid_login.html')


// POST Requests
});

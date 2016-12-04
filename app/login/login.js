
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




// HTTP Requests

// GET Requests
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/client/login.html')
})

app.get('/pharmacist', (request, response) => {
  response.sendFile(__dirname + '/client/pharmacist_portal.html')
})
app.get('/doctor', (request, response) => {
  response.sendFile(__dirname + '/client/doctor_portal.html')
})
app.get('/patient', (request, response) => {
  response.sendFile(__dirname + '/client/patient_portal.html')
})

app.get('/login', (request,response) =>{
  console.log('in login get');
  client.fetchValue({ bucket: 'login', key:request.query.email, convertToJs: true },
      function (err, rslt) {
          if (err) {
              throw new Error(err);
          } else {
              var riakObj = rslt.values.shift();
              if(riakObj){
              var bashoman = riakObj.value;
              if ( bashoman.emailAddress == request.query.email && bashoman.password == request.query.password && bashoman.type == request.query.type) {

                if(request.query.type == 'Doctor'){
                  response.redirect('/doctor')

                //redirect to doctor page....
                }
                else if (request.query.type == 'Patient') {
                  response.redirect('/patient')//redirect to patient page.....
                }
                else {
                  response.redirect('/pharmacist')
                }
              }
              else {
              response.redirect('/')
            }
}
          }
      }
  );

  });


  // POST Requests

  // Register form read, write into the database
  app.post('/register', (request,response) => {
    var emailAddress = request.body.email;
    var password = request.body.password;
    console.log(emailAddress);
    console.log(password);
  var people = [
        {
            emailAddress: emailAddress,
            password: password
        }
    ];

    var storeFuncs = [];
    people.forEach(function (person) {
        // Create functions to execute in parallel to store people
        storeFuncs.push(function (async_cb) {
            client.storeValue({
                    bucket: 'login',
                    key: person.emailAddress,
                    value: person
                },
                function(err, rslt) {
                    async_cb(err, rslt);
                }
            );
        });
    });

    async.parallel(storeFuncs, function (err, rslts) {
        if (err) {
            throw new Error(err);
        }
    });


  response.redirect('/')

  });

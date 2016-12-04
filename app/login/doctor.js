
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


  app.get('/dp_review', (request,response) => {
    client.fetchValue({ bucket: 'clinical', key:request.query.dpreview_search, convertToJs: true },
        function (err, rslt) {
            if (err) {
                throw new Error(err);
            } else {
                var riakObj = rslt.values.shift();
                var bashoman = riakObj.value;
                console.log(bashoman);
                  response.render('dp_review', {pname:bashoman.patientName,age:bashoman.Age,gender:bashoman.Gender, diagnosis:bashoman.Diagnosis});// render a page and print the prescription out.
              }
            }
    );
    client.fetchValue({ bucket: 'lab_bucket', key:request.query.dpreview_search , convertToJs: true },

        function (err, rslt) {
            if (err) {
                throw new Error(err);
            } else {
                var riakObj = rslt.values.shift();
                var bashoman = riakObj.value;
                var obtained_img_1 =  bashoman.picture_1;
                var obtained_img_2 =  bashoman.picture_2;
                var obtained_img_3 =  bashoman.picture_3;
                var bitmap_1 = new Buffer(obtained_img_1, 'base64');
                var bitmap_2 = new Buffer(obtained_img_2, 'base64');
                var bitmap_3 = new Buffer(obtained_img_3, 'base64');
                fs.writeFileSync("gen_report_1.jpg", bitmap_1);
                fs.writeFileSync("gen_report_2.jpg", bitmap_2);
                fs.writeFileSync("gen_report_3.jpg", bitmap_3);
              }
            }
            //render the images in a html
    );


  app.get('/dp_represcr', (request,response) => {
    client.fetchValue({ bucket: 'prescription', key:request.query.dpreprescr_search, convertToJs: true },
        function (err, rslt) {
            if (err) {
                throw new Error(err);
            } else {
                var riakObj = rslt.values.shift();
                var bashoman = riakObj.value;
                console.log(bashoman);

                response.render('dp_represcr', {email :  bashoman.emailAddress,pname:bashoman.patientName, dname:bashoman.doctorName, cname:bashoman.clinicName, date:bashoman.date, pmed:bashoman.prescription, oinfo:bashoman.other });

                // render a page and print the prescription out.
              }
            }
    );
  })

  app.get('/dp_medicines', (request,response) => {
    console.log("in medicines");
    client.fetchValue({ bucket: 'medicines', key: request.query.dpmedicines_search, convertToJs: true },
      function (err, rslt) {
          if (err) {
              throw new Error(err);
          } else {
              var riakObj = rslt.values.shift();
              var bashoman = riakObj.value;
            console.log(bashoman);
            response.render('dp_medicines', {disease: bashoman.disease, medicines:bashoman.medicines});

          }
      }
  );
  })

  app.get('/dp_wrprescr', (request,response) => {

    var people = [
    {
        emailAddress: request.query.dpwrprescr_email,
        patientName: request.query.dpwrprescr_pname,
        doctorName: request.query.dpwrprescr_dname,
        clinicName: request.query.dpwrprescr_cname,
        date: request.query.dpwrprescr_date,
        prescription: request.query.dpwrprescr_pmed,
        other:request.query.dpwrprescr_oinfo
    }
];

var storeFuncs = [];
people.forEach(function (person) {
    // Create functions to execute in parallel to store people
    storeFuncs.push(function (async_cb) {
        client.storeValue({
                bucket: 'prescription',
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
});})

  })

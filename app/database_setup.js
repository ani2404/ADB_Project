// Data Base setup

var Riak = require('basho-riak-client');

// List of nodes
var nodes = [
    '10.136.16.206:8098',
    '10.136.16.206:8087'
];
var client = new Riak.Client(nodes, function (err, c) {
    // NB: at this point the client is fully initialized, and
    // 'client' and 'c' are the same object
});

client.ping(function (err, rslt) {
    if (err) {
        throw new Error(err);
    } else {
        // On success, ping returns true
        console.log('Riak database connected successfully');
       // assert(rslt === true);
    }
});



//module.exports.ping = client.ping

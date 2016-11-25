// Data Base setup

var Riak = require('basho-riak-client');

// List of nodes
var nodes = [
    '192.168.0.17:8098',
    '192.168.0.17:8087'
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
        console.log('Pong');
       // assert(rslt === true);
    }
});



//module.exports.ping = client.ping


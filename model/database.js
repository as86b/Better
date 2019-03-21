const mongoose = require('mongoose');
var config = require("./config.json");

mongoose.connect(
    'mongodb://' + config.ipaddr + ':' + config.port + '/better',
    { user: config.user, pass: config.pass }
);
/*
this connection should be available to all other
modules that require('mongoose'), because *magic*
*/

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});

process.on('SIGINT', function() {
  console.log('Severing MongoDB connection...');
  mongoose.connection.close(function () {
    console.log('Disconnected from MongoDB');
    process.exit(0);
  });
});

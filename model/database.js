
const mongoose = require('mongoose');
var config = require("./config.json");

mongoose.connect(
	'mongodb://' + config.ipaddr + ':' + config.port,
	{ user: config.user, pass: config.pass }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database')
});

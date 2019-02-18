
const mongoose = require('mongoose');
var config = require("config.json");

mongoose.connect(
	'mongodb://ipaddr/database',
	{ user: config.user, pass: config.pass}
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database')
});

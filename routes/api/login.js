/* routes for login functions */

const express = require('express');
const router = express.Router();


function checkLoginFormat(l, p) {
	if (l === undefined)
		return false;
	if (p === undefined)
		return false;

	if (l.indexOf("@") > 0) {	// login is an email
		// check email format
	    var atIndex = e.indexOf("@");
	    if (atIndex < 1)	// @ must have at least one preceding character
	    	return false;
	    var dotIndex = e.indexOf(".");
	    if (dotIndex < atIndex+2)	// . must follow @ with at least one character inbetween
	    	return false;
	    if (dotIndex + 1 == e.length)	// . must not be the last character
	    	return false;
	} else {	// login is a username
	    // check username format
	    regex = u.match(/[a-zA-Z0-9!#$%^&*_-]*/)[0]
	    if (regex.length != u.length)
	    	return false;
	}
    
    return true;
}

function validateUser(l, p) {
	if (checkLoginFormat(l, p) == false)
		return false

	if (l.indexOf("@")) {
		// lookup user via email
	} else {
		// lookup user via username
	}
}

router.post('/', function(req, res) {
	login = req.body['login'];
	pass = req.body['password'];
	email = req.body['email'];

	if (validateUser(login, pass) == false) {
		res.json({
			"status": "error",
			"details": "incorrect login."
		});
		return;
	}

	res.send({"status": "success"});
});

module.exports = router;

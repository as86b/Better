/* routes for login functions */

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../../model/User.js');
const Utils = require('../../utilityFunctions.js');


function checkLoginFormat(u, p, e) {
    if (u === undefined)
        return false;
    if (p === undefined)
        return false;
    if (e === undefined)
        return false;

    // check email format
    var atIndex = e.indexOf("@");
    if (atIndex < 1)  // @ must have at least one preceding character
        return false;
    var dotIndex = e.indexOf(".");
    if (dotIndex < atIndex+2)  // . must follow @ with at least one character inbetween
        return false;
    if (dotIndex + 1 == e.length)  // . must not be the last character
        return false;

    // check password length
    if (p.length < 6)
        return false;

    // check username format
    regex = u.match(/[a-zA-Z0-9!@#$%^&*_-]*/)[0]
    if (regex.length != u.length)
        return false;
    
    return true;
}

function isUsernameTaken(user) {
    // check database for username
    return false;
}

function isEmailTaken(email) {
    // check database for email
    return false;
}

router.post('/', function(req, res) {
    uname = req.body['username'];
    pass = req.body['password'];
    email = req.body['email'];

    if (checkLoginFormat(uname, pass, email) == false) {
        res.json({
            "status": "error",
            "details": "There was a problem with your format."
        });
        return;
    }

    if ( isUsernameTaken(uname) ) {
        res.json({
            "status": "error",
            "details": "That username is already taken."
        });
        return;
    }
    if ( isEmailTaken(email) ) {
        res.json({
            "status": "error",
            "details": "That email is already taken."
        });
        return;
    }

    s = generateSalt()

    var user = new User({
        username: uname,
        email: email,
        passHash: hashPassword(pass, s),
        salt: s
    })
    user.save().then(item => {
		res.json({"status": "success"});
	}).catch(err => {
		console.log('\nDatabase ERROR - ' + new Date(Date.now()).toLocaleString())
		console.log(err)
		res.json({
			"status": "error",
			"details": "There was an error saving to the database."
		});
	});

});

module.exports = router;

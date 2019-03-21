/* routes for login functions */

const express = require('express');
const router = express.Router();


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
    // TODO assign a user a default profile picture 
    user = req.body['username'];
    pass = req.body['password'];
    email = req.body['email'];

    if (checkLoginFormat(user, pass, email) == false) {
        res.json({
            "status": "error",
            "details": "There was a problem with your format."
        });
        return;
    }

    if ( isUsernameTaken(user) ) {
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

    res.json({"status": "success"});
});

module.exports = router;

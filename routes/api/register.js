
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../../model/User.js');
const Utils = require('../../utilityFunctions.js');


function checkLoginFormat(u, p, e) {
    return (
    	Utils.checkEmailFormat(e) &&
    	Utils.checkUsernameFormat(u) &&
    	Utils.checkPasswordLength(p)
    );
}

async function registerUser(uname, pass, email, res) {
    u = await User.findOne({ username: uname }).exec();
    e = await User.findOne({ email: email }).exec();

    if (u) {
        res.json({
            "status": "error",
            "details": "That username is already taken."
        });
        return;
    }
    if (e) {
        res.json({
            "status": "error",
            "details": "That email is already taken."
        });
        return;
    }

    s = Utils.generateSalt()

    var user = new User({
        username: uname,
        email: email,
        passHash: Utils.hashPassword(pass, s),
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

    registerUser(uname, pass, email, res);
});

module.exports = router;

/* routes for login functions */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../model/User.js');
const Utils = require('../../utilityFunctions.js');
const auth = require("../../auth.json");

var validTokens = {};

async function validateUser(l, p) {
    if (l === undefined)
        return false;
    if (p === undefined)
        return false;

    var doc;
    if (l.indexOf("@") > 0) {
        if (!Utils.checkEmailFormat(l))
            return false;
        doc = await User.findOne({ email: l }).exec();
    } else {
        if (!Utils.checkUsernameFormat(l))
            return false;
        doc = await User.findOne({ username: l }).exec();
    }
    if (!doc)
        return false;

    if (Utils.hashPassword(p, doc.salt) != doc.passHash)
        return false;

    if (!validTokens[doc.username]) {
        validTokens[doc.username] = jwt.sign(
            { username: doc.username },
            auth.jwt_key,
            { expiresIn: '24h' }
        );
    }

    return validTokens[doc.username];
}

router.post('/', function(req, res) {
    const login = req.body['login'];
    const pass = req.body['password'];

    validateUser(login, pass).then(v => {
        if (v == false) {
            res.json({
                "status": "error",
                "details": "incorrect login."
            });
        } else {
            res.json({
                "status": "success",
                "username": login,
                "token": v
            });
        }
    }).catch(err => {
        console.log(err)
    })
});

module.exports = router;

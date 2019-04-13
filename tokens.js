
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const auth = require("./auth.json");

var tokenDict = {};

function addToken(username) {
	key = crypto.randomBytes(128).toString('base64');
	// Index keys by usernames, so we can easily delete all
	// login tokens for a user, if they want to log out
	// from all connected devices
	if (!tokenDict[username])
		tokenDict[username] = {};
	tokenDict[username][key] = true;

	return jwt.sign(
        {
        	key: key,
        	username: username
        },
        auth.jwt_key,
        { expiresIn: '24h' }
    );
}

function revokeToken(username, key) {
	if (key == null)
		validTokens[username] = {};
	else
		validTokens[username][key] = false;

	return true;
}

function checkToken(token) {
	try {
		data = jwt.verify(token, auth.jwt_key);
	} catch(err) {
		return false;
	}

	if (tokenDict[data.username][data.key])
		return data;

	return false;
}


module.exports = {
	addToken,
	revokeToken,
	checkToken
}
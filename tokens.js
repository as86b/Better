
const jwt = require('jsonwebtoken');

const auth = require("./auth.json");

var validTokens = {};

function addToken(userID) {
	if (!validTokens[userID]) {
        validTokens[userID] = jwt.sign(
            { user_id: userID },
            auth.jwt_key,
            { expiresIn: '24h' }
        );
    }

    return validTokens[userID];
}

function revokeToken(userID) {
	validTokens[userID] = null;

	return true;
}

function checkToken(userID, token) {
	if (token == null)
		return false

	if (validTokens[userID] == token)
		return true;

	return false;
}

module.exports = {
	addToken,
	revokeToken,
	checkToken
}
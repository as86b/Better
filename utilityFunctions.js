
const crypto = require('crypto');

function hashPassword(pass, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(pass);
    var value = hash.digest('hex');
    return value;
}

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function checkUsernameFormat(u) {
	if (u === undefined)
        return false;

    regex = u.match(/[a-zA-Z0-9!#$%^&*_-]*/)[0]
    if (regex.length != u.length)
        return false;

    return true;
}

function checkEmailFormat(e) {
	if (e === undefined)
        return false;

    var atIndex = e.indexOf("@");
    if (atIndex < 1)  // @ must have at least one preceding character
        return false;
    var dotIndex = e.indexOf(".");
    if (dotIndex < atIndex+2)  // . must follow @ with at least one character inbetween
        return false;
    if (dotIndex + 1 == e.length)  // . must not be the last character
        return false;

    return true;
}

function checkPasswordLength(p) {
	if (p === undefined)
        return false;

    if (p.length < 6)
        return false;

    return true;
}

module.exports = {
	hashPassword,
	generateSalt,
	checkUsernameFormat,
	checkEmailFormat,
	checkPasswordLength,
}
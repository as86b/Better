
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

module.exports = {
	hashPassword,
	generateSalt
}
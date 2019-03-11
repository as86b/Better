/* routes for login functions */

const express = require('express');
const router = express.Router();


function validateUser(l, p) {
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

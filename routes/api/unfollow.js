/* routes for follow functions */

const express = require('express');
const router = express.Router();

const Tokens = require('../../tokens.js');
const User = require('../../model/User.js');


async function unfollowUser(username, userToUnfollow, res) {
	doc = await User.findOne({ username: userToUnfollow }).exec();
	if (!doc) {
		res.json({
			"status": "error",
			"details": "That user could not be found."
		});
		return;
	}

	User.updateOne(
		{ username: username },
		{ $pull: { following: doc._id } },
	    function (err, success) {
	    	if (err) {
	    		console.log(err);
	    		res.json({
					"status": "error",
					"details": "There was a problem unfollowing this user."
				});
	    	} else {
	    		res.json({"status": "success"});
	    	}
	    }
	);
}

router.post('/', (req,res) => {
	token = req.body['token'];
    t = Tokens.checkToken(token);

    if (!t) {
    	res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return;
    }
    username = t.username;

    userToUnfollow = req.body['user'];
    unfollowUser(username, userToUnfollow, res);
});

module.exports = router;

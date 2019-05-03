/* routes for follow functions */

const express = require('express');
const router = express.Router();

const Tokens = require('../../tokens.js');
const User = require('../../model/User.js');


async function followUser(username, userToFollow, res) {
	doc = await User.findOne({ username: userToFollow }).exec();
	if (!doc) {
		res.json({
			"status": "error",
			"details": "That user could not be found."
		});
		return;
	}

	User.findOne({ username: username })
		.exec().then( item => {
			//check for dupe follows
		    var isInArr = item.following.some(function(f) {
		    	return f.equals(doc._id.toString());
		    });
		    if (isInArr) {
		    	res.json({
					"status": "error",
					"details": "You're already following this user."
				});
				return;
		    }

		    User.updateOne(
				{ username: username },
				{ $push: { following: doc._id } },
			    function (err, success) {
			    	if (err) {
			    		console.log(err);
			    		res.json({
							"status": "error",
							"details": "There was a problem following this user."
						});
			    	} else {
			    		res.json({"status": "success"});
			    	}
			    }
			);
	})

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

    userToFollow = req.body['user'];
    followUser(username, userToFollow, res);
});

module.exports = router;

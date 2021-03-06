/* routes for reply functions */

const express = require('express');
const router = express.Router();

const Tokens = require('../../tokens.js');
const Post = require('../../model/Post.js');
const User = require('../../model/User.js');


async function flagPost(postID, username, res) {

	//get uid from username
    doc = await User.findOne({ username: username }).exec();
    if (!doc) {
        res.json({
            "status": "error",
            "details": "That user could not be found."
        });
        return;
    }

    Post.findOne({ _id: postID })
        .exec().then( item => {
            if (!item) {
                res.json({
                    "status": "error",
                    "details": "That post could not be found."
                });
                return;
            }
            
            //check for dupe flags
            var isInArr = item.flags.some(function(f) {
            	return f.equals(doc._id.toString());
            });
            if (isInArr) {
            	res.json({
					"status": "error",
					"details": "You've already flagged this post."
				});
				return;
            }

            Post.updateOne(
				{ _id: postID },
				{ $push: { flags: doc._id } },
			    function (err, success) {
			    	if (err) {
			    		res.json({
							"status": "error",
							"details": "There was a problem flagging this post."
						});
			    	} else {
			    		res.json({"status": "success"});
			    	}
			    }
			);
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

    postID = req.body['postID'];

    flagPost(postID, username, res)
});


module.exports = router;

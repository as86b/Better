/* routes for reply functions */

const express = require('express');
const router = express.Router();

const Tokens = require('../../tokens.js');
const Post = require('../../model/Post.js');
const Reply = require('../../model/Reply.js');
const User = require('../../model/User.js');

async function supportPost(postID, username, res) {

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
            
            //check for dupe supports
            var isInArr = item.supports.some(function(f) {
            	return f.equals(doc._id.toString());
            });
            if (isInArr) {
            	res.json({
					"status": "error",
					"details": "You've already supported this post."
				});
				return;
            }

            Post.updateOne(
				{ _id: postID },
				{ $push: { supports: doc._id } },
			    function (err, success) {
			    	if (err) {
			    		console.log(err);
			    		res.json({
							"status": "error",
							"details": "There was a problem supporting this post."
						});
			    	} else {
			    		res.json({"status": "success"});
			    	}
			    }
			);
        }
    );
}

async function supportReply(postID, username, res) {

	//get uid from username
    doc = await User.findOne({ username: username }).exec();

    Reply.findOne({ _id: postID })
        .exec().then( item => {
            if (!item) {
                res.json({
                    "status": "error",
                    "details": "That reply could not be found."
                });
                return;
            }
            
            //check for dupe supports
            var isInArr = item.supports.some(function(f) {
            	return f.equals(doc._id.toString());
            });
            if (isInArr) {
            	res.json({
					"status": "error",
					"details": "You've already supported this reply."
				});
				return;
            }

            Reply.updateOne(
				{ _id: postID },
				{ $push: { supports: doc._id } },
			    function (err, success) {
			    	if (err) {
			    		console.log(err);
			    		res.json({
							"status": "error",
							"details": "There was a problem supporting this reply."
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
    if (req.body['reply']) {
        supportReply(postID, username, res);
    }
    else {
        supportPost(postID, username, res)
    }
});


module.exports = router;

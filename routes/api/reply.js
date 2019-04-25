/* routes for reply functions */

const express = require('express');
const router = express.Router();

const Tokens = require('../../tokens.js');
const Post = require('../../model/Post.js');
const Reply = require('../../model/Reply.js');
const User = require('../../model/User.js');

async function addReply(username, postID, body, anon, res) {

	doc = await User.findOne({ username: username }).exec();
	if (!doc) {
		res.json({
			"status": "error",
			"details": "User does not exist."
		});
		return;
	}
	console.log(doc);
	var reply = new Reply({
		user_id: doc._id,
		post_id: postID,
        body: body,
        timestamp: Date.now(),
        isAnonymous: anon
    });
    reply.save().then(item => {
		Post.update(
			{ _id: postID },
			{ $push: { replies: item._id } },
		    function (err, success) {
		    	if (err) {
		    		res.json({
						"status": "error",
						"details": "That post could not be found."
					});
		    		Reply.find({ _id: item._id }).remove().exec();
		    	} else {
		    		res.json({"status": "success"});
		    	}
		    }
		);
	}).catch(err => {
		console.log('\nDatabase ERROR - ' + new Date(Date.now()).toLocaleString());
		console.log(err);
		res.json({
			"status": "error",
			"details": "There was an error saving to the database."
		});
	});
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
	body = req.body['body'];
    anon = false;
    if (req.body['anon'])
    	anon = true;

    addReply(username, postID, body, anon, res);
});

module.exports = router;

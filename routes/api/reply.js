/* routes for reply functions */

const express = require('express');
const router = express.Router();

const Post = require('../../model/Post.js');
const Reply = require('../../model/Reply.js');

async function addReply(postID, body, anon, res) {

	var reply = new Reply({
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
	postID = req.body['postID'];
	body = req.body['body'];
    anon = false;
    if (req.body['anon'])
    	anon = true;

    addReply(postID, body, anon, res);
});

module.exports = router;

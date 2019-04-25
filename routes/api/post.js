
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Tokens = require('../../tokens.js');
const Post = require('../../model/Post.js');
const User = require('../../model/User.js');
const Reply = require('../../model/Reply.js');

async function addPost(username, title, body, scope, anon, res) {

	//get uid from username
    doc = await User.findOne({ username: username }).exec();

	var post = new Post({
        user_id: doc._id,
        username: username, 
        title: title,
        body: body,
        scope: scope,
        file: '',
        replies: [],
        supports: [],
        flags: [],
        tags: [],
        timestamp: Date.now(),
        isAnonymous: anon
    })
    post.save().then(item => {
		res.json({"status": "success"});
	}).catch(err => {
		console.log('\nDatabase ERROR - ' + new Date(Date.now()).toLocaleString())
		console.log(err)
		res.json({
			"status": "error",
			"details": "There was an error saving to the database."
		});
	});
}

async function retrievePost(postID, res) {

    Post.findOne({ _id: postID })
        .populate({
            path: 'replies',
            populate: { path: 'user_id', select: 'username' },
            select: ['body', 'isAnonymous', 'timestamp']
        })
        .populate('user_id', 'username')
        .exec().then( item => {
            console.log('item');
            console.log(item);
            if (!item) {
                res.json({
                    "status": "error",
                    "details": "That post could not be found."
                });
                return;
            }

            if (item.isAnonymous) {
                item.username = "Anonymous"
            }

            replies = []
            item.replies.forEach(function(r) {
                if (r.isAnonymous) {
                    r.username = "Anonymous";
                }
            });

            res.json({
                "status": "success",
                "post": item
            });
        }
    );
}

router.post('/', (req,res) => {
	// !! NEED TO CHECK FOR XSS, SQLi, & GENERAL VERIFICATION !!
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

    title = req.body['title'];
    body = req.body['body'];
    scope = req.body['scope'];
    anon = false;
    if (req.body['anon'])
    	anon = true;

    addPost(username, title, body, scope, anon, res);
});

router.get('/:post', (req,res) => {
    postID = req.params['post'];
    console.log('getting post: ' + postID);

    retrievePost(postID, res);
});

module.exports = router;

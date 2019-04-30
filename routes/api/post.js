
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
		res.json({
            "status": "success",
            "_id": item._id
        });
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
            populate: { path: 'user_id', select: 'username' }
        })
        .populate('user_id', 'username')
        .exec().then( item => {
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

            let replies = [];
            var u; 
            for (var i = 0; i < item.replies.length; i++) {
                if (item.replies[i].isAnonymous) {
                    u = "Anonymous";
                }
                else {
                    u = item.replies[i].user_id.username;
                }

                console.log(item.replies[i]);

                replies.push({
                    "_id": item.replies[i]._id,
                    "username": u,
                    "body": item.replies[i].body,
                    "file": item.replies[i].file,
                    "timestamp": item.replies[i].timestamp,
                    "supports": item.replies[i].supports,
                    "flags": item.replies[i].flags
                });
            }

            delete item.replies;

            res.json({
                "status": "success",
                "post": item,
                "replies": replies
            });
        }
    );
}

router.post('/addPicture', (req,res) => {
    token = req.body['token'];
    t = Tokens.checkToken(token);

    if (!t) {
    	res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return;
    }

    let post_id = req.body['_id'];
    let filename = req.body['filename'];
    Post.addPicture(post_id, filename, (err, post) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "details": "Failed to add picture to post"
            });
        }
        else {
            res.json({ "status": "success" });
        }
    })
});

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

    retrievePost(postID, res);
});

module.exports = router;

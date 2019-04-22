
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Tokens = require('../../tokens.js');
const Post = require('../../model/Post.js');

router.post('/', (req,res) => {
    uid = req.body['user_id'];
    token = req.body['token'];
    if (!Tokens.checkToken(uid, token)) {
    	res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return;
    }

    title = req.body['title'];
    body = req.body['body'];
    anon = false;
    if (req.body['anon'])
    	anon = true;

    var post = new Post({
        title: title,
        body: body,
        supports: 0,
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
});

module.exports = router;
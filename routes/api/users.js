/* routes for user functions */

const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const Post = require('../../model/Post');
const Tokens = require('../../tokens.js');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);

let db = mongoose.connection;
let gfs;  
db.once('open', () => {
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('uploads');
});

// gets the users ID based on username
// NOTE require authentication?
router.get('/getID/:username', (req, res) => {
    User.findOne({ username: req.params['username']} ).exec()
    .then((user) => {
        console.log('user found');
        console.log(user);
        res.json({
            "status": "success",
            "_id": user._id
        });
    })
    .catch((err) => {
        console.log(err); 
        res.json({
            "status": "error",
            "details": "Failed to retrieve user info"
        });
    });
});

// creates a follower relationship between the two users
router.post('/addFollower', (req, res) => {
    // verify token
    var token = req.body['token'];
    var t = Tokens.checkToken(token);
    if (!t) {
        res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return; 
    }

    // get the user and establish the follow
    let user = req.body['user'];
});

// handle user changing bio 
router.post('/changeBio', (req, res) => {
    // verify token
    var token = req.body['token'];
    var t = Tokens.checkToken(token);
    if (!t) {
        res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return; 
    }

    User.updateBio(t.username, req.body['bio'], (err, user) => {
        if (err) {
            console.log(err); 
            res.json({
                "status": "error",
                "details": "Failed to update bio"
            });
        }
        else {
            res.json({ "status": "success", "user": user });
        }
    });
});

// handle picture changes
router.post('/changeProfilePicture', (req, res) => {
    var token = req.body['token'];
    var t = Tokens.checkToken(token);
    
    if (!t) {
        console.log("Can't update profile picture");
    	res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return;
    }
    
    User.updateProfilePicture(t.username, req.body['filename'], (err, user) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "details": "Failed to update profile picture"
            });
        }
        else {
            res.json({
                "status": "success"
            });
        }
    });
});

// check if the token sent belongs to the given username
router.post('/checkProfile', (req, res) => {
    var token = req.body['token'];
    var username = req.body['username'];
    var t = Tokens.checkToken(token);
    
    if (!t) {
        console.log("Can't update profile picture");
    	res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return;
    }
    
    if (t.username === username) {
        res.json({ "status": "success" });
    }
    else {
        res.json({ "status": "failure" });
    }
});

router.get('/getProfile/:username', (req, res) => {
    User.findOne({ username: req.params['username']} ).exec()
    .then((user) => {
        res.json({
            // TODO get more stuff here 
            "username": user.username,
            "bio": user.bio,
        });
    })
    .catch((err) => {
        console.log(err); 
        res.json({
            "status": "error",
            "details": "Failed to retrieve user info"
        });
    });
});

router.get('/getProfilePosts/:username-:page', (req, res) => {
    Post.getPostsForPublicUser(req.params['username'], req.params['page'], (err, posts) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "details": "Failed to retrieve posts for user"
            });
        }
        else {
            res.json({
                "status": "success",
                "posts": posts
            });
        }
    });
});

router.get('/getProfilePicture/:username',  (req, res) => {
    // get the filename of the user's profile picture
    User.getProfilePicture(req.params['username'], (err, pic) => {
        if (err) {
            console.log(err);
        }
        else if (pic) {
            // now get the actual profile picture 
            gfs.findOne({ filename : pic.profilePicture }, (err, file) => {
                if (err) {
                    console.log(err);
                }
                else if (file) {
                    // checking specifically for image here
                    if (file.contentType == 'image/png' || file.contentType == 'image/jpeg') {
                        res.set('Content-Type', file.mimeType);
                        const readstream = gfs.createReadStream(file.filename);
                        readstream.pipe(res);
                    }
                    else {
                        console.log('File specified is not an image');
                    }
                }
                else {
                    console.log('Failed to find specified file');
                }
            });
        }
        else {
            console.log('No profile picture set');
        }
    });
});

module.exports = router;
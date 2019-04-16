/* routes for user functions */

const express = require('express');
const router = express.Router();
const User = require('../../model/User');
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

// handle single file uploads
router.post('/changeProfilePicture', (req, res) => {
    token = req.body['token'];
    console.log('checking token: ' + token);
    t = Tokens.checkToken(token);
    
    if (!t) {
        console.log("Can't update profile picture");
    	res.json({
            "status": "error",
            "details": "You are not authorized to make that request."
        });
        return;
    }
    
    User.updateProfilePicture(req.body['username'], req.body['filename'], (err, user) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "details": "Failed to update profile picture"
            });
        }
        else {
            res.json({
                "status": "success",
                "user": user
            });
        }
    });
});

router.get('/getProfilePicture/:username',  (req, res) => {
    console.log('retrieving profile picture for ' + req.params['username']);
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
/* routes for user functions */

const express = require('express');
const router = express.Router();
const User = require('../../model/User');

// handle single file uploads
router.post('/changeProfilePicture', (req, res) => {
    console.log('updating ' + req.body['username']);
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

router.get('/getProfilePicture', (req, res, next) => {
    // TODO need to authenticate with jwt 

    console.log(req.params['username'] + ' retrieving profile picture');
    // get the filename of the user's profile picture
    User.getProfilePicture(req.params['username'], (err, pic) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "details": "Failed to retrieve profile picture"
            });
        }
        else {
            // now get the actual profile picture 
        }
    });

});

module.exports = router;
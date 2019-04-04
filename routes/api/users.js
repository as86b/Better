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

module.exports = router;
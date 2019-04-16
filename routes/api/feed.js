/* routes for feed functions */

const express = require('express');
const router = express.Router();
const Post = require('../../model/Post');

router.get('/:scope-:page', (req,res) => {
    // FIXME allows for people to specify pages beyond what is allowed..
    console.log('retrieving feed');
    console.log(req.params);
    Post.getPostsForFeed('global', 1, (err, feed) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "details": "Failed to retrieve the feed"
            })
        }
        else {
            console.log(feed);
            res.json({
                "status": "success",
                "feed": feed
            }); 
        }
    });
});

module.exports = router;

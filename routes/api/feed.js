/* routes for feed functions */

const express = require('express');
const router = express.Router();
const Post = require('../../model/Post');

router.get('/:scope-:page', (req,res) => {
    // FIXME allows for people to specify pages beyond what is allowed..
    Post.getPostsForFeed(req.params['scope'], req.params['page'], (err, feed) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "error",
                "details": "Failed to retrieve the feed"
            })
        }
        else {
            for (var i = 0; i < feed.docs.length; i++) {
                if (feed.docs[i].isAnonymous) {
                    feed.docs[i].username = "Anonymous";
                }
            }
            res.json({
                "status": "success",
                "feed": feed
            }); 
        }
    });
});

module.exports = router;

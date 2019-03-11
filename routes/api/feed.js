/* routes for feed functions */

const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('hello');
    res.json({'hi': 'hello'});
});

module.exports = router;

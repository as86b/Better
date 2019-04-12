
const express = require('express');
const router = express.Router();
const database = require('../../model/database.js');

// handle single file uploads
router.post('/', database.upload.single('file'), (req, res) => {
  console.log('file: ' + req.file);
  res.json({
    "status": "success", 
    "file": req.file
  }); 
});

// handle single file requests by username 
router.get('/image/:filename', (req, res) => {
  console.log('fetching filename: ' + req.params['filename']);
  let rs = database.getFile(req.params['filename']);
  if (rs.status && rs.status === "error") {
    res.json(rs);
  }
  else {
    // we have a readstream
    rs.pipe(res);
  }
});

module.exports = router; 
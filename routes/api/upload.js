
const express = require('express');
const router = express.Router();
const database = require('../../model/database.js');
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
router.post('/', database.upload.single('file'), (req, res) => {
  console.log('file: ' + req.file);
  res.json({
    "status": "success", 
    "file": req.file
  }); 
});

// handle single file requests by username 
router.get('/image/:filename', (req, res) => {
  console.log(req.params['filename']);
  gfs.findOne({ filename : req.params['filename'] }, (err, file) => {
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
});

module.exports = router; 
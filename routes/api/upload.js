const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../../auth.json');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

const db = mongoose.connection; 
let gfs; 

db.once('open', () => {
  // gfs will handle image and file uploads 
  console.log('Upload service connection established');
  gfs = Grid(db.db, mongoose.mongo); 
  gfs.collection('uploads'); 
});

// function to handle image uploads using gridfs 
const storage = new GridFsStorage({
  url: 'mongodb://' + config.db.ipaddr + ':' + config.db.port + '/better', 
  file: (req, file) => {
    console.log('Attempting to upload file: ' + file.originalname); 
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        else {
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          }
          resolve(fileInfo);
        }
      });
    });
  }
});
  
const upload = multer({ storage: storage });

// handle single file uploads
router.post('/', upload.single('file'), (req, res) => {
  console.log('file: ' + req.file);
  res.json({
    "status": "success", 
    "file": req.file
  }); 
});

// handle single file requests by username 
router.get('/image/:filename', (req, res) => {
  console.log('fetching filename: ' + req.params['filename']);
  gfs.files.findOne({ filename : filename }, (err, file) => {
    if (file) {
      // checking specifically for image here
      if (file.contentType == 'image/png' || file.contentType == 'image/jpeg') {
        res.set('Content-Type', file.mimetype);
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
      else {
        const err = { "status": "error", "details": "File is not an image" };
        json.res(err);
      }
    }
    else {
      const err = { "status": "error", "details": "Failed to find specified file" };
      json.res(err);
    }
  });
});

module.exports = router; 
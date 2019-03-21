const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../../model/config.json');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

const db = mongoose.connection; 
let gfs; 

db.once('open', () => {
  // gfs will handle image and file uploads 
  gfs = Grid(db.db, mongoose.mongo); 
  gfs.collection('uploads'); 
});

// function to handle image uploads using gridfs 
const storage = new GridFsStorage({
  url: 'mongodb://' + config.ipaddr + ':' + config.port + '/better', 
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
  res.json({succ: true, file: req.file}); 
});

// handle single file requests by username 
router.get('/image/:filename', (req, res) => {
  console.log('fetching filename: ' + req.params['filename']);
  gfs.files.findOne({ filename : req.params['filename'] }, (err, file) => {
    if (file) {
      // checking specifically for image here
      if (file.contentType == 'image/png' || file.contentType == 'image/jpeg') {
        res.set('Content-Type', file.mimetype);
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
      else {
        const err = { status: false, msg: "file is not an image" };
        res.json(err);
      }
    }
    else {
      const err = { status: false, msg: "failed to find file" };
      res.json(err);
    }
  });
});

module.exports = router; 
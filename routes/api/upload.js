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
      console.log('attempting to upload file ' + file.originalname); 
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
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
  
  const upload = multer({ storage });

  router.post('/', upload.single('file'), (req, res) => {
    console.log('upload this file'); 
  });

module.exports = router; 
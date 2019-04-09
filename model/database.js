const mongoose = require('mongoose');
const auth = require("../auth.json");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

mongoose.connect(
    'mongodb://' + auth.db.ipaddr + ':' + auth.db.port + '/better',
    { user: auth.db.user, pass: auth.db.pass }
);
/*
this connection should be available to all other
modules that require('mongoose'), because *magic*
*/

process.on('SIGINT', function() {
  console.log('Severing MongoDB connection...');
  mongoose.connection.close(function () {
    console.log('Disconnected from MongoDB');
    process.exit(0);
  });
});

var db = mongoose.connection;
let gfs; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
    gfs = Grid(db.db, mongoose.mongo); 
    gfs.collection('uploads');
}); 

// function to handle image uploads using gridfs 
const storage = new GridFsStorage({
  url: 'mongodb://' + auth.db.ipaddr + ':' + auth.db.port + '/better', 
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
  
// middleware for file uploads
exports.upload = multer({ storage: storage });
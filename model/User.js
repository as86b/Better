/* 
    User
    define the characteristics of a user's profile
*/

const mongoose = require('mongoose');
const Post = require('./Post');
const Reply = require('./Reply');
const DirectMessage = require('./DirectMessage');

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true},
    salt: String,
    passHash: String,
    email: {type: String, unique: true},
    // NOTE this default string may need to be updated whenever we migrate databases
    profilePicture: {type: String, default: '01b3da157b7723542ae495876e70b95c.png'},
    bio: String,
    isVerified: Boolean,
    // NOTE look into populate filling these arrays
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],            
    anonPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],       
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],          
    anonReplies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],     
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],       
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],      
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],      
    blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],          
    direct_messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DirectMessage' }], 
    authToken: String
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.updateProfilePicture = (username, filename, callback) => {
    console.log(username + ' changing profile pic: ' + filename);
    User.updateOne(
      {username: username},
      {$set: {profilePicture: filename}},
      {multi: false},
      callback
    );
};

module.exports.getProfilePicture = (username, callback) => {
    User.findOne(
        {username: username},
        callback
    ).select('profilePicture');
}
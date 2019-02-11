/* 
    User
    define the characteristics of a user's profile
*/

const mongoose = require('mongoose');
const Post = require('./Post');
const Reply = require('./Reply');
const DirectMessage = require('./DirectMessage');

const UserSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,                    // primary key
    username: {type: String, unique: true},                                           
    salt: String,
    email: {type: String, unique: true}, 
    profilePicture: String,
    bio: String,
    isVerified: Boolean,
    // NOTE look into populate filling these arrays
    posts: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Post' }],            
    anonPosts: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Post' }],       
    replies: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],          
    anonReplies: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],     
    following: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'User' }],       
    followers: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'User' }],      
    connections: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'User' }],      
    blocked: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'User' }],          
    direct_messages: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'DirectMessage' }], 
    authToken: String
});

const User = module.exports = mongoose.model('User', UserSchema);
/*
    Post
    content that is created and shared with other users
    TODO support media uploads
*/

const mongoose = require('mongoose');
const User = require('./User');
const Reply = require('./Reply');
const Tag = require('./Tag');

const PostSchema = mongoose.Schema({
    post_id: mongoose.Schema.Types.ObjectId,                            // primary key
    user_id: { _id: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    title: String,                                                      // NOTE do we want posts to have titles?                                              
    body: String,
    replies: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    supports: Number,
    tags: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    timestamp: String,
    isAnonymous: Boolean,
    salt: String
});

const Post = module.exports = mongoose.model('Post', PostSchema);
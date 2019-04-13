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
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    title: String,                                                                                               
    body: String,
    scope: String,
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    supports: Number,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    timestamp: String,
    isAnonymous: Boolean,
    salt: String
});

const Post = module.exports = mongoose.model('Post', PostSchema);
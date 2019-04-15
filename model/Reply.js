/*
    Reply
    a post that is a reply to another post 
    TODO support media uploads
*/

const mongoose = require('mongoose');
const User = require('./User');
const Post = require('./Post');

const ReplySchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    body: String,
    supports: Number,
    timestamp: String,
    isAnonymous: Boolean,
    salt: String
});

const Reply = module.exports = mongoose.model('Reply', ReplySchema);
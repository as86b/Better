/*
    Reply
    a post that is a reply to another post 
    TODO support media uploads
*/

const mongoose = require('mongoose');
const User = require('./User');

const ReplySchema = mongoose.Schema({
    reply_id: mongoose.Schema.Types.ObjectId,                            // primary key
    // NOTE posts have titles, replies do not ..?                                               
    body: String,
    replies: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],   // NOTE support replies to replies? 
    supports: Number,
    tags: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],        // NOTE support tags on replies?
    timestamp: String,
    isAnonymous: Boolean,
    salt: String
});

const Post = module.exports = mongoose.model('Post', PostSchema);
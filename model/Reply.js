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
    file: String,
    supports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    flags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timestamp: String,
    isAnonymous: Boolean,
});

const Reply = module.exports = mongoose.model('Reply', ReplySchema);

module.exports.addPicture = (id, filename, callback) => {
    Reply.updateOne(
        {_id: id},
        {$set: {file: filename}},
        {multi: false},
        callback
    );
}
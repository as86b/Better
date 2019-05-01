/*
    Reply
    a post that is a reply to another post 
    TODO support media uploads
*/

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const User = require('./User');
const Post = require('./Post');

const ReplySchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    body: String,
    file: String,
    supports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    flags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timestamp: String,
    isAnonymous: Boolean,
});

ReplySchema.plugin(mongoosePaginate);

const Reply = module.exports = mongoose.model('Reply', ReplySchema);

module.exports.addPicture = (id, filename, callback) => {
    Reply.updateOne(
        {_id: id},
        {$set: {file: filename}},
        {multi: false},
        callback
    );
}

module.exports.getSupported = (user_id, page, callback) => {
    let options = {
        sort: { timestamp: -1 },
        page: page,
        limit: 20
    };
    let query = {
        supports: user_id
    }
    Reply.paginate(
        query,
        options,
        callback
    ); 
}

module.exports.getPostsForPublicUser = (username, page, callback) => {
    let options = {
        sort: { timestamp: -1 },
        page: page,
        limit: 20
    };
    let query = { 
        username: username,
        isAnonymous: false
    };
    Reply.paginate(
        query,
        options,
        callback
    );
}
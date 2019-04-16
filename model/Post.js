/*
    Post
    content that is created and shared with other users
    TODO support media uploads
*/

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const User = require('./User');
const Reply = require('./Reply');
const Tag = require('./Tag');

const PostSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    title: String,                                                                                               
    body: String,
    scope: String,
    file: String,
    scope: String,
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    supports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    flags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    timestamp: Date,
    isAnonymous: Boolean
});

PostSchema.plugin(mongoosePaginate);

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostsForFeed = (scope, page, callback) => {
    let options = { 
        sort: { timestamp: -1 },
        page: page, 
        limit: 30,
    };
    Post.paginate(
        { scope: scope }, 
        options, 
        callback
    ); 
}
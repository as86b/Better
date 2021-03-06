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
    username: String, 
    title: String,                                                                                               
    body: String,
    scope: String,
    file: String,
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
    console.log('getting page: ' + page);
    let options = { 
        sort: { timestamp: -1 },
        page: page, 
        limit: 20
    };
    switch(scope) {
        case 'global':
            Post.paginate(
                { scope: scope }, 
                options, 
                callback
            ); 
            break;

        case 'followers':
            // TODO
            break;
        
        case 'verified':
            Post.paginate(
                { username: 'Better' }, 
                options, 
                callback
            ); 
            break;
    }

}

module.exports.getPostsForOwner = (username, scope, page, callback) => {
    let options = {
        sort: { timestamp: -1 },
        page: page,
        limit: 20
    };
    Post.paginate(
        { username: username, scope: scope },
        options,
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
    Post.paginate(
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
        isAnonymous: false,
        scope: 'global'
    };
    Post.paginate(
        query,
        options,
        callback
    );
}

module.exports.addPicture = (id, filename, callback) => {
    Post.updateOne(
        {_id: id},
        {$set: {file: filename}},
        {multi: false},
        callback
    );
}
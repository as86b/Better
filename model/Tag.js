/*
    Tag
    custom identifiers attached to posts to assist with filtering
*/

const mongoose = require('mongoose');
const Post = require('./Post');

const TagSchema = mongoose.Schema({
    tag_name: {type: String, unique: true},                        // primary key
    posts: [{ _id: mongoose.Schema.Types.ObjectId, ref: 'Post' }]    
});

const Tag = module.exports = mongoose.model('Tag', TagSchema);
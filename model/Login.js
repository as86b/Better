/*
    Login
    helps authenticate users. added security layer
*/

const mongoose = require('mongoose');
const User = require('./User');

const LoginSchema = mongoose.Schema({
    // TODO ask Trevor how this collection should be structured
    username: String,
    email: String,                                                  // primary key
    userId: { _id: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Tag = module.exports = mongoose.model('Login', LoginSchema);
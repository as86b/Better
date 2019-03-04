/* 
    DirectMessage
    private message shown only between the sender and receiver 
*/

const mongoose = require('mongoose');
const User = require('./User');

const DirectMessageSchema = mongoose.Schema({
    direct_message_id: mongoose.Schema.Types.ObjectId,                    // primary key
    user_id1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    user_id2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    messages: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        timestamp: String,
        text: String
    }]
});

const DirectMessage = module.exports = mongoose.model('DirectMessage', DirectMessageSchema);
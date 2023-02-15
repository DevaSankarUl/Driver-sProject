const mongoose = require('mongoose')
const Schema = mongoose.Schema
const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    constent: {
        type: String,
        trim: true
    },
    chat: {
        type: Schema.Types.ObjectId, ref: 'Chat'
    },

}, {
    timeStamps: true,
})
const Message = mongoose.model('Message', messageSchema)
module.exports = Message 
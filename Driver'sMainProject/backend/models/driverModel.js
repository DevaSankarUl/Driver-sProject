const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DriverSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    LiscenceNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    approvel: {
        type: String,
        required: true
    },
    blockStatus: {
        type: String,
        required: true
    }
})

const Driver = mongoose.model('Driver', DriverSchema)
module.exports = Driver
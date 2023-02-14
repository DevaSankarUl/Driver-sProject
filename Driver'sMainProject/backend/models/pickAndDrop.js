const { time } = require('console')
const mongoose = require ('mongoose')
const Schema= mongoose.Schema
const PickSchema = new Schema({
    pick:{
        type:String,
        requried:true
    },
    Destination:{
        type:String,
        required:true
    },
    carType:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        requried:true
    },status:{
        type:String
    }
}) 
const pickAndDrop = mongoose.model('pickAndDrop',PickSchema)
module.exports=pickAndDrop
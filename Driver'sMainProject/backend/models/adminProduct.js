const mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminProductSchema = new Schema({
    washname:{
        type:String,
        String:true
    },
    price:{
        type:Number,
        required:true
    },
    materials:[{
        type:String,
        
    }],
    firstImage:{
        type:String
    },
    secondImage:{
        type:String
    },
    thirdImage:{
        type:String
    },
    fourthImage:{
        type:String
    },
})
const Product = mongoose.model('Product',adminProductSchema)
module.exports = Product
// const { ObjectId } = require("bson")
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const authorSchema1 = new mongoose.Schema({
    
    authorName : String,
    age : Number,
    address : String,
    rating : Number
})

module.exports = mongoose.model('Writers', authorSchema1 )
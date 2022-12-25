const mongoose = require("mongoose")

const SchemaUser = new mongoose.Schema({
    name : String,
    balance : Number,
    address : String,
    age : Number,
    gender : { 
        type : String,
        enum : ["male","female","other"]
        },
    isFreeAppUser :{
        type : Boolean
         }
},{timestamps : true})

module.exports = mongoose.model('Customer', SchemaUser)
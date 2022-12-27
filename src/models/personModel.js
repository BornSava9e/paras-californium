const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    mobile : Number,
    email : String,
    password: String,
    gender : {
        type : String,
        enum : ["male", "female" , "other"]
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    age : Number

},{timestamps : true});

module.exports = mongoose.model('Persons', personSchema)
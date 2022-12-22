const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const publisherSchema1 = new mongoose.Schema({
   
    name : String,
    headQuaters : String
})

module.exports = mongoose.model( 'Publisher', publisherSchema1)
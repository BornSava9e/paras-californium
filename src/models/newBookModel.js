const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema1 = new mongoose.Schema({
    name : String,
    author : {
        type : ObjectId,
        ref : "Writers",
        required : true,
        unique : true
    },
    price : Number,
    ratings : Number,
    publisher : {
        type : ObjectId,
        ref : "Publisher",
        required : true,
        unique : true
    }
})

module.exports = mongoose.model("BooksLibrary", bookSchema1)

const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    name : String,
    author_id : Number,
    price : Number,
    rating : Number
})

module.exports = mongoose.model("Book3", bookSchema)
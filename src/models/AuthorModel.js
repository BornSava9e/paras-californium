const mongoose = require('mongoose');


const AuthorSchema = new mongoose.Schema({
    author_id : Number,
    authorName : String,
    age : Number,
    address : String

})

module.exports = new mongoose.model("author1",  AuthorSchema)
const mongoose = require("mongoose")

const bookschema = new mongoose.Schema({

    BookName : {type : String, required : true },
    BookAuthor : String,
    BookCover : {
        type : String,
        enum : ["cardboard", "plastic","print"]
    }

})

module.exports = mongoose.model('books', bookschema)
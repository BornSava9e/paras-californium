const AuthorModel = require("../models/AuthorModel")
const bookModel3 = require("../models/bookModel3")


const CreateAuthor = async function(req, res){
    let author= req.body
    let newAuthor = await AuthorModel.create(author)
    console.log("Author is created");
    res.send( { Authors : newAuthor });
}

module.exports.CreateAuthor = CreateAuthor



const createBook3 =  async function(req, res){
    let book = req.body
    let newBook = await bookModel3.create(book)
    console.log("Book is created");
    res.send( { book : newBook });
}

module.exports.createBook3 = createBook3
const booksModel = require("../models/booksModel")

const createBook = async function(req,res){
    let book = req.body
    let result = await booksModel.create(book)
    res.send({book : result})
}

const showBook = async function(req,res){
    let allbooks= await booksModel.find()
    res.send({msg: allbooks})
}

module.exports.createBook = createBook
module.exports.showBook = showBook

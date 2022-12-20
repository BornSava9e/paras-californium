const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

// assignment 19 dec
const AuthorModel = require("../models/AuthorModel")
const bookModel3 = require("../models/bookModel3")
const AuthorCreate= require("../controllers/authorController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.post("/updateBooks", BookController.updateBooks)
router.post("/deleteBooks", BookController.deleteBooks)

//MOMENT JS
const moment = require('moment');
router.get("/dateManipulations", function (req, res) {
    
    // const today = moment();
    // let x= today.add(10, "days")

    // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
    // console.log(validOrNot)
    
    const dateA = moment('01-01-1900', 'DD-MM-YYYY');
    const dateB = moment('01-01-2000', 'DD-MM-YYYY');

    let x= dateB.diff(dateA, "days")
    console.log(x)

    res.send({ msg: "all good"})
})

//  assignment 19 dec  create author question 1
router.post("/createAuthor", AuthorCreate.CreateAuthor )

router.post("/createBook3", AuthorCreate.createBook3 )

// question 2  find the books using author name
router.get("/list", async function(req,res){
    // let id = req.params.author_id
   
    //below code will give us author id having the name of chetan bhagat
    let author = await  AuthorModel.find({authorName : "Chetan Bhagat"}).select({_id :0 ,author_id : 1})
    // below code will find the book of above author with the help of author id
   
    let book = await bookModel3.find(author[0])
    console.log(author)
    res.send({msg : book})
})

// question 3 show the author of two states and update the price of that book to 100

router.get("/authorname", async function(req,res){
    // below code will give us author id of book name two states
    let book = await bookModel3.findOne({name :"Two states"}).select({_id :0, author_id : 1})
    console.log(book)
    // below code will give us the author of above author id which we store in book
    let author = await AuthorModel.findOne(book[0]).select({_id :0,authorName : 1})
    console.log(author)
     
    // let oldPrice = await bookModel3.findOne({name : "Two states"}).select({_id : 0, price : 1})

    // to change the price of the book of two states
    let price = await bookModel3.findOneAndUpdate(
        {name:"Two states"},
        {$set : {price : 100}},
        {new : true}
    ).select({_id : 0, price : 1})
    console.log(price)
    res.send({msg : author, new : price})
    
})
 // question 4 find the book which cost between the price of 50 and 100 and show the authornames of these books.

 router.get("/price", async function(req,res){
    // this book variable get the array of author id from those books which price is greater than 50 and below 100 
    let book = await bookModel3.find({price : {$gte : 50, $lte : 100}}).select({_id : 0 ,author_id : 1})
    console.log(book)
    //below code is used for getting the author name of the author_id which is inside the array of book above
        let authr = await AuthorModel.find(book.forEach(author=>author)).select({_id:0, author_id : 1,authorName:1})
        console.log(authr)
        // let authors = await book.map(id=> AuthorModel.findOne(id))
    // console.log(authors)
    res.send({msg :  authr})
 })


module.exports = router;
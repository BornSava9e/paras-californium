const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController");
const bookModel = require('../models/bookModel');
const bookModel2 = require('../models/bookModel2');


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.post("/book", async function(req ,res){
    let book = req.body
    let saveBook = await bookModel2.create(book)
    res.send({msg : saveBook})
})

router.get("/see", async function(req, res){
    let showBooks2 = await bookModel2.find({year : 1991})
    res.send({allbooks :  showBooks2}) 
})

router.get("/see2", async function(req, res){
    let showBooks2 = await bookModel2.find().select({"bookName" : 1 , "author" : 1, "_id" : 0})
    res.send({allbooks :  showBooks2}) 
})

router.get("/see3", async function(req, res){
    let showBooks2 = await bookModel2.find({"pages":500})
    res.send({allbooks :  showBooks2}) 
})
module.exports = router;
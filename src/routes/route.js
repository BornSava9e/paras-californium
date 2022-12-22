const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)


const reference = require("../controllers/referenceController")

// 29 th day assignment 

const newAuthorModel = require('../models/newAuthorModel');
const newBookModel = require('../models/newBookModel');
const newPublisherModel = require('../models/newPublisherModel');
// 1! creating author data api 
router.post("/makeauthor", async function(req, res){
    let body =  req.body
    let author = await newAuthorModel.create(body)
    res.send({ Data : author})
})

// 2! creating publisher data api
router.post("/publisher", async function(req,res){
    let body =  req.body
    let publisher =  await newPublisherModel.create(body)
    res.send({Data : publisher})
})



//3! creating book data api 
//  const {isValidObjectId} = require("mongoose");

router.post("/book", async function(req,res){
    let body = req.body
    const author_id = await newAuthorModel.findOne({_id : body.author })
    const publisher_id = await newPublisherModel.findOne({_id : body.publisher})
    if(!author_id){
        res.send({status : false , msg : "author doesn't exist"})
    }

    if(!publisher_id){
        res.send({status : false,  msg :  "publisher doesn't exist" })
    }

    let book = await newBookModel.create(body)
    res.send({Data : book})
})

// 4! fetch all the books with their author details as well as publisher details

router.get("/get", async function(req, res){
    const bookDetails =  await newBookModel.find().populate("author").populate("publisher")
    res.send({status : true ,  data : bookDetails})
})

// 5! put api to update books

router.put("/update", async function(req, res){
    //const Find = await newBookModel.findOneAndUpdate({"publisher.name" : "Penguin"},{$set : {"isHardCover" : true}},{new : true})
   
    const Find = await newPublisherModel.find({name : "Penguin"}).select({_id : 1})
    const book = await newBookModel.findOneAndUpdate({publisher : Find[0]},{$set : {isHardCover : true}}, {new : true})
    res.send({msg : book})
})

router.put("/update2", async function(req ,res){
    const find = await newBookModel.findOneAndUpdate({rating : {$gte : 3.5}},{$set : {price : 60}})
    res.send({ msg : find})
})
module.exports = router;
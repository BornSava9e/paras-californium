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


router.get("/")


//3! creating book data api 
 const {isValidObjectId} = require("mongoose")
router.post("/book", async function(req,res){
    let body = req.body

    if(!(isValidObjectId(body.author._id))&&(isValidObjectId(body.publisher._id))){
        res.send({msg: "enter valid object ids"})
    }else{

    }

})


module.exports = router;
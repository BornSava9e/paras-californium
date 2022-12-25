const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares");


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", commonMW.abc, BookController.createBook  )
router.post("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.abc, UserController.basicCode, commonMW.mid4)

//======================================================================
// Assignment

const Modelproduct = require('../models/Modelproduct');

router.post("/product", async function(req,res){
    let data =  req.body
    const product = await Modelproduct.create(data)
    res.send({msg : product})
})

const user = require("../middlewares/middleware2");
const Modeluser = require('../models/Modeluser');
router.post("/user",user.condition1, async function(req,res){
    let data = req.body
    const user = await Modeluser.create(data)
    res.send({Data : user})
})





module.exports = router;
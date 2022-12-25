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
// Assignment 31 st middleware 2 
//question 1 create product in database

const Modelproduct = require('../models/ModelProduct');

router.post("/product", async function(req,res){
    let data =  req.body
    const product = await Modelproduct.create(data)
    res.send({msg : product})
})

// question 2 check isfreeappuser is present or not in headers of postman, if present create user
const user = require("../middlewares/middleware2");
const Modeluser = require('../models/Modeluser');
const ModelOrder = require('../models/ModelOrder');
const { ObjectId } = require('bson');
router.post("/user",user.condition1, async function(req,res){
    let data = req.body
    const user = await Modeluser.create(data)
    res.send({Data : user})
})

// question 3  

router.post("/order", user.condition1, user.checkBal , async function(req,res){
    // user validation 
    let userid = req.body.userId
    let checkValid1 = await Modeluser.findOne({_id : userid})

    let productid = req.body.productId
    let checkvalid2 =  await Modelproduct.findOne({_id : productid})

    if(!checkValid1 && !checkvalid2){
        res.send({msg: "userid or productid is not correct"})
    }else{
        const data = req.body
        const headerdata = req.headers['isfreeappuser'] // get header freeappuser value true or false
        
        if(headerdata){             // if isFreeAppUser is false 

            let userBalance = checkValid1.balance               // getting user balance
            let amt = data.amount                               // getting order amount

            const balance = userBalance - amt

            let update = await Modeluser.findOneAndUpdate(              // update in db
                {_id : data.userId},
                {$set : {balance : balance}, isFreeAppUser : false} 
            )

            const order = await ModelOrder.create(data) // upar jayega
            res.send({msg : order})
            
        }else{              // if isFreeAppUser is true
            await Modeluser.findOneAndUpdate(                       // if user balance is 100 so it will set it 0
                {_id : data.userid},
                {$set : {balance : 0}})
            const order = await ModelOrder.create(data)
            res.send({purchase : order})
        }

    } 
})




module.exports = router;
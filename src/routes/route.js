const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mongoose = require("mongoose")
// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/users", userController.createUser  )

// router.post("/login", userController.loginUser)

// //The userId is sent by front end
// router.get("/users/:userId", userController.getUserData)

// router.put("/users/:userId", userController.updateUser)



// ============================================
// assignment 32
// 1 api register person
const personModel= require("../models/personModel")

router.post("/register", async function(req, res){
    try{
    const body = req.body
    const person = await personModel.create(body)
    res.status(201).send({status :true ,user : person})
    
    }catch(error){
        res.status(500).send({msg : "error" , problem : error.message})
    }
})

// 2 api login
const jwt = require("jsonwebtoken")
router.post("/login", async function(req,res){
try{
    const emailId = req.body.email          // get email from postman body
    const userpassword = req.body.password  // get password from postman body

    // checking in person model these credentials are correct or not.
    const person = await personModel.findOne({email : emailId, password : userpassword})    

    if(!person){
        res.status(401).send({status : false, msg : "email or password is incorrect"})
    }else{
        // if credentials are correct so create a token with the help of JWT 
        const token = jwt.sign({objId : person._id , name : person.firstName}, "secretkey001")
        console.log(token)
        res.status(201).send({status : true, Data : token})
    }
}catch(error){
    res.status(500).send({msg : "error" , problem : error.message})
}
})

//3 check personId and jwt token is correct or not
const checkToken = require("../middlewares/auth")
const route = require("../controllers/personController")


router.get("/person/:personId",checkToken.condition1, route.route1)

//4 put api to update the user details

router.put("/users/:personId", checkToken.condition1 ,checkToken.condition2, route.route2)

//5 Delete api 

router.delete("/user/:personId", checkToken.condition1 ,checkToken.condition2, route.route3)



module.exports = router;
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
    const body = req.body
    const person = await personModel.create(body)
    res.send({status :true ,user : person})
})

// 2 api login
const jwt = require("jsonwebtoken")
router.post("/login", async function(req,res){
    const emailId = req.body.email          // get email from postman body
    const userpassword = req.body.password  // get password from postman body

    // checking in person model these credentials are correct or not.
    const person = await personModel.findOne({email : emailId, password : userpassword})    

    if(!person){
        res.send({status : false, msg : "email or password is incorrect"})
    }{
        // if credentials are correct so create a token with the help of JWT 
        const token = jwt.sign({objId : person._id , name : person.firstName}, "secretkey001")
        console.log(token)
        res.send({status : true, Data : token})
    }
})

//3 check personId and jwt token is correct or not
const checkToken = require("../middlewares/auth")

router.get("/person/:personId",checkToken.condition1, async function(req,res){
    const personId = req.params.personId        // getting personId in personId variable
    const token = req.headers["x-auth-token"]   // getting jwt token in token variable
    
    const verify = jwt.verify(token, "secretkey001")  
    // verifying token if correct give payload to verif variable
    
    if(personId === verify.objId){             // if id in params matched with payload verified object id                                 
        res.send({status : true , msg : "user token is valid", details : verify}) 
    }else{
        res.send({ status : false , msg : "user id is not matched"})
    }    
})

//4 put api to update the user details

router.put("/users/:userId", checkToken.condition1 , async function(req,res){
    const userid = req.params.userId
    const token = req.headers["x-auth-token"]

    const verifyToken = jwt.verify(token, "secretkey001")
    
    if(userid === verifyToken.objId){
    const update = await personModel.findOneAndUpdate(
        {_id : userid},
        {$set : {lastName : "kumar"}},
        {new : true}
    )
    res.send({status : true, data : update})
}else{
    res.send( {status : false, msg : "unable to find person"})
}
})

//5 Delete api 

router.delete("/user/:userId", checkToken.condition1 , async function(req, res){
    const userid = req.params.userId
    const token = req.headers["x-auth-token"]

    const verifyToken = jwt.verify(token, "secretkey001")
    
    if(userid === verifyToken.objId){
        const update = await personModel.findOneAndUpdate(
            {_id : userid},
            {$set : {isDeleted : true}},
            {new : true}
        )
        res.send({status : true,msg : "now this user is deleted", data : update})
    }else{
        res.send({status : false , msg : "unable to find the person"})
    }
})

module.exports = router;
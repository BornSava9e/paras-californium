const personModel= require("../models/personModel")
const checkToken = require("../middlewares/auth")
const jwt = require("jsonwebtoken")
const router = require("../routes/route")

//3 check personId and jwt token is correct or not
const route1 = async function(req,res){
  try{const personId = req.params.personId        // getting personId in personId variable
    const token = req.headers["x-auth-token"]   // getting jwt token in token variable
    
    const verify = jwt.verify(token, "secretkey001")  
    // verifying token if correct give payload to verif variable
    if(verify){
    
        if(personId == verify.objId){            
        // if id in params matched with payload verified object id                                 
        res.status(200).send({status : true , msg : "user token is valid", details : verify}) 
    }else{
        res.status(403).send({ status : false , msg : "user id is not matched"})
         }

    } else{
        res.status(400).send({msg : "token is invalid"})
    }
}catch(error){
        res.status(500).send({msg : "error" , problem : error.message})
    }
}
//4 put api to update the user details
const route2 = async function(req,res){
    try{
    const userid = req.params.personId
    const token = req.headers["x-auth-token"]

    const verifyToken = jwt.verify(token, "secretkey001")
    if(verifyToken){
    
        if(userid === verifyToken.objId){
        const update = await personModel.findOneAndUpdate(
        {_id : userid},
        {$set : {lastName : "kumar"}},
        {new : true}
        )
        res.status(200).send({status : true, data : update})
        }else{
        res.status(403).send( {status : false, msg : "user id not matched"})
        }
   
    }else{
        res.status(400).send({msg : "token is invalid"})
    }
    }catch(error){
        res.status(500).send({msg : "error" , problem : error.message})
    }
}
//5 Delete api

const route3 = async function(req, res){
    try{
    const userid = req.params.personId
    const token = req.headers["x-auth-token"]

    const verifyToken = jwt.verify(token, "secretkey001")
  
    if(verifyToken){

    if(userid === verifyToken.objId){
        const update = await personModel.findOneAndUpdate(
            {_id : userid},
            {$set : {isDeleted : true}},
            {new : true}
        )
        res.status(200).send({status : true,msg : "now this user is deleted", data : update})
    }else{
        res.status(403).send({status : false , msg : "userid not matched"})
    }
}else{
    res.status(400).send({msg : "token is invalid"})
}
    }catch(error){
        res.status(500).send({msg : "error" , problem : error.message})
    }
}


module.exports.route1 = route1 ;
module.exports.route2 = route2 ;
module.exports.route3 = route3 ;

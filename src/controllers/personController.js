const personModel= require("../models/personModel")
const checkToken = require("../middlewares/auth")
const jwt = require("jsonwebtoken")

//3 check personId and jwt token is correct or not
const route1 = async function(req,res){
    const personId = req.params.personId        // getting personId in personId variable
    const token = req.headers["x-auth-token"]   // getting jwt token in token variable
    
    const verify = jwt.verify(token, "secretkey001")  
    // verifying token if correct give payload to verif variable

    if(personId == verify.objId){            
        // if id in params matched with payload verified object id                                 
        res.send({status : true , msg : "user token is valid", details : verify}) 
    }else{
        res.send({ status : false , msg : "user id is not matched"})
    }    
}
//4 put api to update the user details
const route2 = async function(req,res){
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
}
//5 Delete api
const route3 = async function(req, res){
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
}
module.exports.route1 = route1 ;
module.exports.route2 = route2 ;
module.exports.route3 = route3 ;
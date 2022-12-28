const personModel = require("../models/personModel") 
const jwt = require("jsonwebtoken")

const condition1 = async function(req,res,next){
    const token = req.headers["x-auth-token"]
    // console.log("token is - ",token)
    if(!token){
        res.send({status : false, msg : "x-auth-token is mandatory"})
    }else
    {
        next()
    }
}

// api to check the authorization of person
const condition2 = async function (req,res, next){
    const personId = req.params.personId        // getting personId in personId variable
    const token = req.headers["x-auth-token"]   // getting jwt token in token variable
    
    const verify = jwt.verify(token, "secretkey001")     // verifying the JWT Token we get an user object id from db 
    
    if(personId==verify.objId){             // authentication and authorization of user using his data object id and verified token id.                               
        next() 
    }else{
        res.send({ status : false , msg : "user id is not authorized"})
    } 
}
module.exports.condition1 = condition1

module.exports.condition2 = condition2
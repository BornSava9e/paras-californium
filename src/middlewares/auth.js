const personModel = require("../models/personModel") 

const condition1 = async function(req,res,next){
    const token = req.headers["x-auth-token"]
    console.log("token is - ",token)
    if(!token){
        res.send({status : false, msg : "x-auth-token is mandatory"})
    }else
    {
        next()
    }
}

module.exports.condition1 = condition1
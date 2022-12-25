const Modeluser = require("../models/Modeluser")

// 2 problem
const condition1 =  async function(req,res,next){
    // req.headers will give us the access to headers field of postman 
    // then we can check isfreeappuser is present in headers or not.
    const freeuser = req.headers
    const check = req.headers['isfreeappuser']
       if (freeuser['isfreeappuser']){
        console.log(check)      // for checking what is the value inside freeappuser
        next()
    }else{
        
        res.send({msg : "isFreeAppUser is mandatory field"})
    }
}
module.exports.condition1 = condition1;


// question 4 

const checkBal = async function(req, res, next){
    const body = req.body
    const bal = await Modeluser.findOne({_id : body.userId}) 

    if(bal.balance < body.amount){
        res.send("insufficient balance")
    }else{
        next()
    }
}

module.exports.checkBal = checkBal;
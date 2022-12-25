// 2 problem
const condition1 =  async function(req,res,next){
    const freeuser = req.headers
    console.log(freeuser["isFreeAppUser"])
    if (freeuser['isfreeappuser']){
        console.log(freeuser)
        next()
    }else{
        res.send({msg : "isFreeAppUser is mandatory field"})
    }
}
module.exports.condition1 = condition1;
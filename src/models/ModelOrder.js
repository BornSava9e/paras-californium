const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    productId : mongoose.Schema.Types.ObjectId,
    amount : Number,
    isFreeAppUser : { 
        type : Boolean,
        default : false
    }
},{timestamps : true})

module.exports = mongoose.model('Order', OrderSchema)
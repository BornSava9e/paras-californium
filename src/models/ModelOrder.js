const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer"
    },
    productId : { 
        type :mongoose.Schema.Types.ObjectId,
        ref : "product"
    },
    amount : Number,
  
},{timestamps : true})

module.exports = mongoose.model('Order', OrderSchema)
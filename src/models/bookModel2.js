const mongoose=require('mongoose')

const bookSchema= new mongoose.Schema({
   bookName: {
       type: String,
       required: true
   },
   author: String,
   tags: [ String ],
   year: Number,
   isPublished: {
       type: Boolean, 
       default: false
   },
   prices: {
       indianPrice : Number,
       europeanPrice: Number,
       japanPrice: Number
   },
   sales: {
       type: Number,
       default : 0
   },
   completionDate: Date,
   pages : {type : Number}

}, {timestamps: true} )

module.exports = mongoose.model( 'Book2', bookSchema )

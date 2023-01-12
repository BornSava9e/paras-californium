const express = require('express')
const bodyParser = require('body-parser');
const route = require('./routes/route')
const app = express()
const mongoose= require('mongoose')
// mongoose.set("strictQuery", false)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://Paras_Anand:paras4321@cluster0.3z8igom.mongodb.net/group5Database",{useNewUrlParser:true})
.then(()=>console.log("Mongo db is connected"))
.catch(err=>console.log(err))
app.use('/',route)
app.listen(process.env.PORT || 3000, function(){
      console.log('Express app running on port ' + (process.env.PORT|| 3000))
})



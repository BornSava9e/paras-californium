const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const app = express();
const mongoose = require("mongoose")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);

mongoose.connect("mongodb+srv://Paras_Anand:paras4321@cluster0.3z8igom.mongodb.net/Paras_db",
{usenewUrlparser:true})
.then(()=>{console.log("mongodb is connected")})
.catch(err=> console.log(err))

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

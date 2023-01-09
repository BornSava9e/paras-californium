const express = require("express")
const { lstat } = require("fs")
const mongoose = require("mongoose")
const route = require("./routes/route")
mongoose.set('strictQuery', false);

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://Paras_Anand:paras4321@cluster0.3z8igom.mongodb.net/Project-2",
    {useNewUrlParser : true}
)
.then(() => console.error("My Db is connected"))
.catch((err) => console.error(err))

app.use("/",route)

app.listen(3000 , ()=>{
    console.error("Express app is running on port" + 3000);
})
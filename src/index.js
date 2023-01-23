const express=require("express")
const mongoose=require("mongoose")
const app=express()
const bodyParser=require("body-parser");
const route=require("./routes/route")

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Paras_Anand:paras4321@cluster0.3z8igom.mongodb.net/Url_shortner",{
    useNewUrlParser: true,
})
.then(()=> console.log("DB is Connected"))
.catch(error=>console.log(error))


app.use("/",route)

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})






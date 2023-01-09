const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
mongoose.set('strictQuery', true)

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://Paras_Anand:paras4321@cluster0.3z8igom.mongodb.net/Paras_db",{
      useNewUrlParser:true
})
.then(() => console.error("My DB is connected"))
.catch((err) => console.error(err))


app.use("/",route)

app.listen(3000 , () => {
      console.error("Express app running on port " + 3000);
})






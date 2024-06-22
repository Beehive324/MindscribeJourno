const e = require("express");
const express=require("express");
const app=express();
const mongoose= require("mongoose");

const mongoUrl="mongodb+srv://fairson123:admin@cluster0.wrd9mty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
});

app.get("/",(req, res)=>{
    res.send({status:"Started"})
})

app.listen(5001, ()=> {
    console.log("Node js server started.");
}) 
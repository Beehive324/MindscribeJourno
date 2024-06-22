const e = require("express");
const express=require("express");
const app=express();
const mongoose= require("mongoose");
app.use(express.json());

const mongoUrl="mongodb+srv://fairson123:admin@cluster0.wrd9mty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
});

require('./Userdetails')

const User = mongoose.model("UserInfo");
app.get("/",(req, res)=>{
    res.send({status:"Started"})
});

app.post('/register', async(req,res)=>{
    const {email, password}=req.body;

    const oldUser= await User.findOne({email:email});

    if(oldUser){
        return res.send({data:"User already exists!"});
    }
 
    try {
        await User.create({
            email: email,
            password: password
        });
        res.send({status: "ok", data: "User Created"})
    } catch (error) {}

});

app.listen(5001, ()=> {
    console.log("Node js server started.");
});
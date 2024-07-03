const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const IP_ADDRESS = '10.113.79.205';
const PORT = 8083;


const mongoUrl="mongodb+srv://fairson123:admin@cluster0.wrd9mty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const JWT_SECRET = "sdfsdfsdfsdfsdf234234oinsdofn(090fs9df0sdf"


mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
});

require('./Userdetails');

const User = mongoose.model("UserData");
app.get("/",(req, res)=>{
    res.send({status:"Started"})
});

app.post('/register', async(req,res)=>{
    console.log("registration request:", req.body);
    const {email,username, password}=req.body;

    const oldUser= await User.findOne({email:email});

    if(oldUser){
        return res.send({data:"User already exists!"});
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

 
    try {
        await User.create({
            email: email,
            username: username,
            password: encryptedPassword
        });
        res.send({status: "ok", data: "User Created"})
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).send({error: "Registration failed. Please try again."});
    }

});

app.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    const oldUser = await User.findOne({email: email});


    if (!oldUser) {
        return res.send({data: "User doesn't exist!!"})
    }

    if (await bcrypt.compare(password, oldUser.password)){
        const token = jwt.sign({email: oldUser}, JWT_SECRET);

        if(res.status(201)){
            return res.send({status:"ok", data:token})
        }else{
            return res.send({ error: "error"});
        }

    }

});

app.listen(PORT, IP_ADDRESS, ()=> {
    console.log("Node js server started.");
});
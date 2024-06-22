const mongoose=require("mongoose");

const UserDetailScheme = new mongoose.Schema({
    email: {type:String, unique: true},
    password: String
},{
    collection:"UserInfo"
});
mongoose.model("UserInfo",UserDetailScheme)
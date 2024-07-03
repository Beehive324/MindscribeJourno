const mongoose=require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    email: {type:String, unique: true},
    username: String,
    password: String
},{
    collection:"UserInfo"
});

const Register = new mongoose.model("UserData", UserDetailSchema);

module.exports = Register;
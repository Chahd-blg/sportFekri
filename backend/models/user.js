//import mongoose module:
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


//creation de la structure du modéle
const userSchema = mongoose.Schema({
    firstName: String,
    lastName:String,
    email: { type: String, unique: true },
    password:String,
    role:String,
    avatar: String,
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);
//creat user model
const user = mongoose.model("user",userSchema);

//make user exportable
module.exports=user;
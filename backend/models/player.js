//import mongoose module:
const mongoose = require("mongoose");

//creation de la structure du modéle
const playerSchema = mongoose.Schema({
    age: Number,
    name:String,
    position: String,
    number:Number,
});
//creat player model
const player = mongoose.model("Player",playerSchema);

//make player exportable
module.exports=player;
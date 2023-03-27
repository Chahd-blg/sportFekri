//import mongoose module:
const mongoose = require("mongoose");

//creation de la structure du modéle
const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo:Number,
    teamOne: String,
    teamTwo:String,
});
//creat match model
const match = mongoose.model("match",matchSchema);

//make match exportable
module.exports=match;
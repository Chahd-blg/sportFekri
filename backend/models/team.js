const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    teamName:String,
    teamOwner: String,
    teamStadium: String,
    teamFondation: Number,
});
const team = mongoose.model("Team",teamSchema);

module.exports = team;
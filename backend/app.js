//import express module
const express = require("express");
//import bcrypt module
const bcrypt = require("bcrypt");
//import jsonwebtoken module
const jwt = require("jsonwebtoken");
// import authenticate
const authenticate = require("./middelware/authenticate");
//import multer module
const multer = require("multer");
// import path module
const path = require("path");
//import body parser module
const bodyParser = require("body-parser");
// import mongoose
const mongoose = require("mongoose");
// import axios

//data base name of this project : sportFekriDB
mongoose.connect('mongodb://127.0.0.1:27017/sportFekriDB');
//Creates an Express application.
const app = express();
//configure body parser
//send JSON responses:( de back vers front)
app.use(bodyParser.json());
//get obj from request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//avatars => shortcut (backend/images => original path)
app.use('/avatars', express.static(path.join('backend/images')));
const MIME_TYPE = {
    //"type de media":"extention"
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        //"backend/images" hedha el path mt3na fel cas hakka ytbadel selon l projet 
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
        cb(null, imgName);
    }
});


//**************Models Importations */
//import any Model ( convention du nommage model en majuscule)
const Match = require("./models/match");
const Player = require("./models/player");
const User = require("./models/user");
const Team = require("./models/team");
const { default: axios } = require("axios");

//*******************Traitement logique du component Match */
let matchesTab = [
    { id: 1, scoreOne: 2, scoreTwo: 0, teamOne: "FCB", teamTwo: "RMD" },
    { id: 2, scoreOne: 5, scoreTwo: 2, teamOne: "CA", teamTwo: "EST" },
    { id: 3, scoreOne: 9, scoreTwo: 3, teamOne: "CSS", teamTwo: "TTT" },];

//Business Logic: Add match
// "/matches" el path eli 7atineh ba3d l url de base 
app.post("/matches", (req, res) => {
    console.log("here BL: Add match");
    // let match = req.body;
    let match = new Match({
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo,
    })
    // old methode -> matchesTab.push(match); the new one :
    match.save();
    res.json({ message: "added successfylly", isadded: true });
    console.log(match);

});

//Business Logic: get all match
app.get("/matches", authenticate, (req, res) => {
    console.log("here BL: get all match");
    Match.find().then((data) => {
        res.json({ matches: data, message: "here all matches" })
    })
});

//Business Logic: edit  match
app.put("/matches", (req, res) => {
    let nvMatch = req.body;
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == nvMatch.id) {
    //         matchesTab[i] = nvMatch;
    //         break;
    //     }

    // }
    Match.updateOne({ _id: nvMatch._id }, nvMatch).then(
        (editResp) => {
            console.log("here is resp of edit from data base", editResp);
            if (editResp.nModified == 1) {
                res.json({ message: "Match Edited successfully" });

            }
        }
    )
});

//Business Logic: get  match by id
app.get("/matches/:id", (req, res) => {
    console.log("here BL: get  match by id");
    let id = req.params.id;
    // let foundedMatch = {};
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == id) {
    //         foundedMatch = matchesTab[i]
    //         break;
    //     }
    // }
    // res.json({ match: foundedMatch });
    Match.findOne({ _id: id }).then((doc) => {
        res.json({ findedMatch: doc });

        // _id:id -> c'est la condition if dans le old script
        // doc->oundedMatch = matchesTab[i] : old version ( l'obj récuperer depuis DB)
    })
});

//Business Logic: delete  match by id
app.delete("/matches/:id", (req, res) => {
    console.log("here BL: delete  match by id");
    let id = req.params.id;
    for (let i = 0; i < matchesTab.length; i++) {
        if (matchesTab[i].id == id) {
            matchesTab.splice(i, 1);
            break;
        }
    }
    res.json({ message: `Matche N° ${id} is deleted ` });
});
//search matches
app.post("/matches/search", (req, res) => {
    console.log(req.body);
    let nvTab = [];
    let searchObj = req.body;
    for (let i = 0; i < matchesTab.length; i++) {
        if (matchesTab[i].scoreOne == searchObj.scoreOne && matchesTab[i].scoreTwo == searchObj.scoreTwo) {
            nvTab.push(matchesTab[i])
        }
    }
    console.log("here nvTab", nvTab);
    res.json({ matches: nvTab });

});

//*************************traitement logique componenet player : 
//ADD PLAYER 
app.post("/players", (req, res) => {
    console.log("here is BL of add players");
    let player = new Player({
        age: req.body.age,
        name: req.body.name,
        position: req.body.position,
        number: req.body.number,
    });
    player.save();
    res.json({ message: "added successfylly", isadded: true });
    console.log(player);
});

app.put("/players", (req, res) => {
    console.log("here is BL of edit players");
});

app.delete("/players/:id", (req, res) => {
    console.log("here is BL of delete players");

});
//get all PLAYERs

app.get("/players", (req, res) => {
    console.log("here is BL of get all players");
    Player.find().then((data) => {
        res.json({ players: data });
    })
});

// Get players by id
app.get("/players/:id", (req, res) => {
    console.log("here is BL of get players by id ", req.params.id);
    //doc : the result of the search by id in the collection players in the data base
    Player.findOne({ _id: req.params.id }).then((doc) => {
        res.json({ player: doc });
    })
});

//************authentification */
app.post("/allUsers/subscription", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 8).then(
        (cryptedPassword) => {
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: cryptedPassword,
                role: req.body.role,
                avatar: `http://localhost:3000/avatars/${req.file.filename}`
            });
            //save methode prédefinie mongoose
            user.save(
                (error, doc) => {
                    console.log("here error", error);
                    console.log("here error", doc);
                    if (doc) {
                        res.json({ message: "added successfylly" });
                    } else {
                        res.json({ message: "ERROR" });
                    }
                }
            );
        }
    )
});

//login:

app.post("/allUsers/signin", (req, res) => {
    console.log("here bl of log in", req.body);
    let user = req.body;
    let findedUser;
    User.findOne({ email: user.email }).then(
        (doc) => {
            findedUser = doc
            if (!doc) {
                res.json({ message: "0" })
            }
            return bcrypt.compare(user.password, doc.password);
        }
        //2cd then result of compare password
    ).then(
        (passwordReslt) => {
            console.log("here passwordReslt", passwordReslt);
            if (!passwordReslt) {
                res.json({ message: "1" });
            } else {
                // sign pour le mixage
                const token = jwt.sign(
                    {
                        email: findedUser.email,
                        userId: findedUser._id,
                        userRole: findedUser.role,
                    },
                    // testing : chaine de hashage la plus dangereuse de préf doit etre une longue chaine + des caractéres spéciaux
                    "Testing",
                    { expiresIn: "1min" }
                );

                let userToSend = {
                    id: findedUser._id,
                    firstName: findedUser.firstName,
                    lastName: findedUser.lastName,
                    role: findedUser.role,
                    jwt: token,
                    expiresIn: 60,
                };

                res.json({ message: "2", user: userToSend });
            }
        }
    )
});

//get user info:
app.get("/allUsers/:id", (req, res) => {
    let id = req.params.id; 
    console.log("here is the id of user ",req.params.id);
      User.findOne({_id: id}).then((doc) => {
        res.json({ findedUser: doc });
    })
});

//edit user:
app.put("/allUsers", (req, res) => {
   
});

//**********traitement du add team */
app.post("/teams", (req, res) => {
    console.log("here into BL add team", req.body);
    let teamObject = new Team({
        teamName: req.body.name,
        teamOwner: req.body.owner,
        teamStadium: req.body.stadium,
        teamFondation: req.body.fondation,
    });

    teamObject.save(
        (err, doc) => {
            console.log('error', err);
            (err) ? res.json({ message: "Nok" }) : res.json({ message: "ok" });
        }
    )
});

//Get all teams
app.get("/teams", (req, res) => {
    console.log("here log get all teams");
    Team.find().then(
        (docs) => {
            res.json({ teams: docs });
        }
    )
});

//delete team by id
app.delete("/teams/:id", (req, res) => {
    let teamId = req.params.id
    console.log("here into delete by id", teamId);
    Team.deleteOne({ _id: teamId }).then(
        (deleteResp) => {
            console.log("resp of delete", deleteResp);
            if (deleteResp.deletedCount == 1) {
                res.json({ message: "Delete is done" })

            }
        }
    )
});

//get team by id 
// lahna nsami myid ou bien ay 7aja n7bha m3ndouch 3ale9a bel app routing 
app.get("/teams/:myid", (req, res) => {
    let id = req.params.myid
    Team.findOne({ _id: id }).then((doc) => {
        res.json({ findedTeam: doc })
    });
});

//weather SEARCH BL
app.post("/weather", (req, res) => {
    console.log(req.body);
    let city = req.body.city;
    let key = "04c01b878aba1be971073150e75491f6"
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    axios.get(apiURL).then((apiResponse) => {
        console.log(apiResponse.data);
        let resultat = {
            temperature: apiResponse.data.main.temp,
            perssure: apiResponse.data.main.perssure,
            humidity: apiResponse.data.main.humidity,
            sunrise: apiResponse.data.sys.sunrise,
            sunset: apiResponse.data.sys.sunset,
            icone: `http://openweathermap.org/img/wn/${apiResponse.data.weather[0].icon}.png`

        }

        res.json({ weatherData: resultat })
    }
    )

});




// make app importable from another files.(this line must be the last one veryyyy important !)
module.exports = app;

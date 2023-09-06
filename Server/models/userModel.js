const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    password : String,
    email : String,
    age : { type: Number, min: 18, max: 65 },
    gender : String,
    residence : String,
    hobby : String,
    liked : [String],
    matches : [String],
    favorite_food : String,
    favorite_music : String,
    songs : String,
    book : String,
    movies : String,
    favorite_vacation_spot : String,
    interested_in : String,
    myPic : String
})

module.exports = mongoose.model('users', UserSchema);
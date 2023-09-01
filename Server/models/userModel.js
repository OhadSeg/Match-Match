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
    liked : [{ type : mongoose.ObjectId, ref: 'users' }],
    matches : [{ type : mongoose.ObjectId, ref: 'users' }],
    favorite_food : String,
    favorite_music : String,
    favorite_vacation_spot : String,
    interested_in : String,
    myPic : String
})

module.exports = mongoose.model('users', UserSchema);
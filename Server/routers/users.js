const express = require('express')
const usersBL = require('../models/usersBL');
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/getUsers', auth, async (req,res) => {
    const users = await usersBL.getUsers(req.user.email)
    return res.json(users)
})

router.post('/registration', async (req,res) => {
    const body = req.body
    try{
        const newUser = await usersBL.registration(body)
        res.status(201).json({msg : "New User created"})
    }catch(error){
        res.status(409).json({message : error.message})
    }
})

router.post('/login', async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const result = await usersBL.login(email, password)
        if(result){
            const jwtEmail = { email: email }
            const accessToken = jwt.sign(jwtEmail, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({ accessToken: accessToken })
        }
        else{
            res.status(401).json({message: "Wrong email/password"})
        }
    }catch(err){
        res.status(401).json({message: "Wrong email/password"})
    }
})

router.get('/getUserDetails', auth, async (req,res) => {
    const user = await usersBL.getUser(req.user.email)
    return res.json(user)
})

router.post('/like', auth, async (req, res) => {
    const ifMatch = await usersBL.likeAndIfMatch(req.user.email, req.body.email)
    return res.json(ifMatch)
})

router.get('/getAllMatches', auth, async (req, res) => {
    const users = await usersBL.getAllMatches(req.user.email)
    return res.json(users)
})

// function authenticateToken(req, res, next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(401)
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
//         if(err) {
//             return res.sendStatus(403)
//         }
//         req.user = email
//         next();

//     })
// }

module.exports = router
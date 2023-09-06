const express = require('express')
const assistantAIBL = require('../models/assistantAIBL')
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/getPlaylist', auth, async (req,res) => {
    const data = await assistantAIBL.createPlaylist(req.user.email, req.query.email);
    return res.json(data)
})


module.exports = router
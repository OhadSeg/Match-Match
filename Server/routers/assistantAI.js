const express = require('express')
const assistantAIBL = require('../models/assistantAIBL')

const router = express.Router();

router.get('/getRestaurant',async (req,res) => {
    const data = await assistantAIBL.getRestAnswer(req.query.id_user1, req.query.id_user2);
    return res.json(data)
})


module.exports = router
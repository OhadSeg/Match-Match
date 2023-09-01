const express = require('express');
const userRouter = require('./routers/users');
const assistantAIRouter = require('./routers/assistantAI');
var cors = require('cors')
require("dotenv").config();

const app = express();

const port = 8080

app.use(express.json());

app.use(cors());

require('./configs/database');

app.use('/api/users', userRouter);
app.use('/api/AssistantAI', assistantAIRouter);

app.listen(port, () =>{
    console.log(`Started on port ${port}`)
});
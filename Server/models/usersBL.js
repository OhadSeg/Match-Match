const userModel = require('./userModel')
const { ObjectId } = require('mongodb')
const bcryptjs = require('bcryptjs')

const saltRounds = 10

const getUsers = async function(userEmail) 
{
    currUser = await getUser(userEmail)
    //const users = await userModel.find({gender: currUser.interested_in, interested_in: currUser.gender})
    const users = await userModel.find({})
    const usersWithoutCurr = users.filter(user => user._id != currUser._id);
    selectedKeys = usersWithoutCurr.map(user => {
        return {"name": user.fname + " " + user.lname, "email": user.email, "myPic": user.myPic}
    })
    return selectedKeys;
}

const getUser = async function(email)
{
    return await userModel.findOne({email: email})
}

const registration = async function(body)
{
    const password = body.password;
    const user = body;
    bcryptjs.hash(password, saltRounds, async (err, hash) => {
        user.password = hash
        const newUser = await userModel.create(user)
        newUser.save()
    })
}

const login = async function(email, password)
{  
    const user = await userModel.findOne({email})
    const isValid = await bcryptjs.compare(password, user.password)
    return isValid ? user : null
}

module.exports = {getUser, getUsers, registration, login}
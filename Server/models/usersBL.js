const userModel = require('./userModel')
const { ObjectId } = require('mongodb')
const bcryptjs = require('bcryptjs')

const saltRounds = 10

const getUsers = async function(userEmail) 
{
    currUser = await getUser(userEmail)
    //const users = await userModel.find({gender: currUser.interested_in, interested_in: currUser.gender})
    const users = await userModel.find({})
    //const usersWithoutCurr = users.filter(user => user._id != currUser._id);
    selectedKeys = users.map(user => {
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

const getAllMatches = async function(userEmail)
{
    const user = await userModel.findOne({ email: userEmail });
    const matchedUsersPromises = user.matches.map( async (matchedEmail) => {
        return await userModel.findOne({ email: matchedEmail });
    })
    const matchedUsers = await Promise.all(matchedUsersPromises);

    selectedKeys = matchedUsers.map(user => {
        return {"name": user.fname + " " + user.lname, "email": user.email, "myPic": user.myPic}
    })
    return selectedKeys
}

const likeAndIfMatch = async function (userEmail, likedUserEmail) {
    try {
        // Find the user and likedUser by their emails
        const user = await userModel.findOne({ email: userEmail });
        const likedUser = await userModel.findOne({ email: likedUserEmail });

        if (!user || !likedUser) {
            throw new Error('User or likedUser not found');
        }

        // Check if the likedUser is not already in the user's liked list
        if (!user.liked.includes(likedUser.email)) {
            // Update the likedUser for the user
            user.liked.push(likedUser.email);

            // Check if there is a match
            if (likedUser.liked.includes(user.email)) {
                user.matches.push(likedUser.email);
                likedUser.matches.push(user.email);
            }

            // Update both users in the database
            await userModel.updateOne({ email: userEmail }, user);
            await userModel.updateOne({ email: likedUserEmail }, likedUser);

            if(likedUser.liked.includes(user.email))
            {
                return user2 = {name: `${likedUser.fname} ${likedUser.lname}`,
                                pic: likedUser.myPic}
            }
            else{
                return null
            }
        } else {
            // If likedUser is already in the liked list, return false (no match)
            return null;
        }
    } catch (error) {
        // Handle any errors here
        console.error(error);   
        throw error;
    }
};

module.exports = {getUser, getUsers, registration, login, likeAndIfMatch, getAllMatches}
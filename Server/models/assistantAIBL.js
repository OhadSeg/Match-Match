const usersBL = require('./usersBL');
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});


const createPlaylist = async function(user1_email, user2_email)
{
    const user1 = await usersBL.getUser(user1_email)
    const user2 = await usersBL.getUser(user2_email)

    const content = `Suggest a playlist of 10 songs that includes both users' favorite music genres for a shared experience:
                        user_1: ${user1.songs}
                        user_2:  ${user2.songs}
                        don't add more words`


    try{
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: content }],
            model: 'gpt-3.5-turbo',
          });
        
          console.log(completion.choices);

    }catch(error) {
        console.log(error)
    }
    return completion;
}




const getRestAnswer = async function(id_user1, id_user2)
{
    const user1 = await usersBL.getUsers(id_user1)
    const user2 = await usersBL.getUsers(id_user2)
    console.log(user1)

    const answer = `hello ${user1[0].fname} from ${user1[0].residence} and hello to ${user2[0].fname}`

    return answer;
    // try{
    //     const completion = await openai.chat.completions.create({
    //         messages: [{ role: 'user', content: 'say hello' }],
    //         model: 'gpt-3.5-turbo',
    //       });
        
    //       console.log(completion.choices);

        

    // }catch(error) {
    //     console.log(error)
    // }

}


module.exports = {getRestAnswer, createPlaylist}
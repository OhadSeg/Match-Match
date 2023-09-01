import { useState, useEffect, useCallback } from 'react';
import classes from './chatBot.module.css'
import ChatBot from "react-simple-chatbot"
import { Segment } from "semantic-ui-react"
import instance from "../../rest-utils"
import myAvatar from './bot-avatar.png';
import idanPic from './idan.jpg'

function AnswerFromGPT() {
    const [answer, setAnswer] = useState('ohad');

    const getAnswer = useCallback(async () => {
        const resp = await instance.get('assistantAI/getRestaurant', {
            params: {
                id_user1: '64df438702096c11c3b479e5',
                id_user2: '64df43db02096c11c3b479e6'
            }
        })
        setAnswer(resp.data)
    
    },[]);

    useEffect(() => {
        getAnswer()
    },[getAnswer])

    
    return (
        <div style={{width: '100%'}}>
            <p>{answer}</p>
        </div>
    );
}

function ChatBotComp() {

    const steps = [
        {
            id:"Greet",
            message:'Hello, Eran!',
            trigger:"Show Menu"
        },
        {
            id:"Show Menu",
            options: [{value: "restaurant", label: "Find me a restaurant for a date", trigger: "RestChosen" },
                    {value: "conversation", label: "Find me a topic of conversation", trigger: "ConvChosen"}]
        },
        {
            id:"RestChosen",
            component: <AnswerFromGPT />,
            trigger:"Another Help"
        },
        {
            id:"ConvChosen",
            component: <AnswerFromGPT />,
            trigger:"Another Help"
        },
        {
            id:"Another Help",
            message:'Can I help you with something else?',
            trigger:"If Return To Show Menu"
        },
        {
            id:"If Return To Show Menu",
            options: [{value: "Yes", label: "Yes", trigger: "Show Menu" },
                    {value: "No", label: "No", trigger: "bye bye"}]
        },
        {
            id:"bye bye",
            message:'I was happy to help, goodbye',
            end: true
        },

    ]
    //trigger: () => handleLinkClick('https://www.wikipedia.org')
    return (
        <>
        <div className={classes.chatBot}>
            <ChatBot hideSubmitButton="true" headerTitle="Your AI Assist" width="450px" botAvatar={myAvatar} userAvatar={idanPic} steps={steps}/>
        </div>
        {/* <Segment floated="right">
            <ChatBot steps={steps}/>
        </Segment> */}
        </>
    );
}

export default ChatBotComp;
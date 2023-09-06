import { useState, useEffect, useCallback } from 'react';
import classes from './chatBot.module.css'
import ChatBot from "react-simple-chatbot"
import instance from "../../rest-utils"
import botIcon from "../../components/Chat/robot-icon.png";
import { useLocation } from "react-router-dom";

function AnswerFromGPT({user2_email}) {
    const [answer, setAnswer] = useState('ohad');

    const getAnswer = useCallback(async () => {
        const token = window.localStorage.getItem('token')
        const resp = await instance.get('assistantAI/getPlaylist', {
            headers:
            {"Authorization" : `Bearer ${token}` },
            params: {
                email: user2_email,
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

    let { state } = useLocation();

    const steps = [
        {
            id:"Greet",
            message:`Hello, ${state.name}`,
            trigger:"Show Menu"
        },
        {
            id:"Show Menu",
            options: [{value: "playlist", label: "Craft Me A Shared Playlist", trigger: "PlaylistChosen" },
                    {value: "conversation", label: "Find me a topic of conversation", trigger: "ConvChosen"}]
        },
        {
            id:"PlaylistChosen",
            component: <AnswerFromGPT user2_email={state.email}/>,
            trigger:"Another Help"
        },
        {
            id:"ConvChosen",
            component: <AnswerFromGPT  user2_email={state.email}/>,
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
    return (
        <>
        <div className={classes.chatBot}>
            <ChatBot hideSubmitButton="true" headerTitle="Your AI Assist" width="450px" botAvatar={botIcon} userAvatar={state.pic} steps={steps}/>
        </div>
        {/* <Segment floated="right">
            <ChatBot steps={steps}/>
        </Segment> */}
        </>
    );
}

export default ChatBotComp;
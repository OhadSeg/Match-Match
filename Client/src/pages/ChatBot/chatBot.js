import { useState, useEffect, useCallback } from "react";
import classes from "./chatBot.module.css";
import ChatBot from "react-simple-chatbot";
import instance from "../../rest-utils";
import botIcon from "../../components/Chat/robot-icon.png";
import { useLocation } from "react-router-dom";

function AnswerFromGPT({ type, user2_email }) {
  const [answer, setAnswer] = useState("generating answer...");

  const getAnswer = useCallback(async () => {
    const token = window.localStorage.getItem("token");
    const resp = await instance.get("assistantAI/getBotResponse", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        req_type: type,
        email: user2_email,
      },
    });
    console.log(resp.data);
    setAnswer(resp.data);
  }, []);

  useEffect(() => {
    getAnswer();
  }, [getAnswer]);

  return (
    <div style={{ width: "100%" }}>
      <p>{answer}</p>
    </div>
  );
}

function ChatBotComp() {
  let { state } = useLocation();
  const steps = [
    {
      id: "Greet",
      message: `Hello, ${state.myName}`,
      trigger: "Show Menu",
    },
    {
      id: "Show Menu",
      options: [
        {
          value: "music",
          label: "Craft Me A Shared Music Playlist",
          trigger: "Show Music",
        },
        {
          value: "movies",
          label: "Suggest Me Movies For Date Night",
          trigger: "Show Movies",
        },
        {
          value: "conversation",
          label: "Suggest Me An Interesting Conversation Starter",
          trigger: "Show Conversation Starter",
        },
        {
          value: "openning_line",
          label: "Suggest Me An Openning Line",
          trigger: "Show Openning Line",
        },
        {
          value: "chat_analysis",
          label: "Analyze Our Conversation",
          trigger: "Show Chat Analysis",
        },
      ],
    },
    {
      id: "Show Music",
      component: <AnswerFromGPT type="music" user2_email={state.email} />,
      trigger: "Another Help",
    },
    {
      id: "Show Movies",
      component: <AnswerFromGPT type="movies" user2_email={state.email} />,
      trigger: "Another Help",
    },
    {
      id: "Show Conversation Starter",
      component: (
        <AnswerFromGPT type="conversation" user2_email={state.email} />
      ),
      trigger: "Another Help",
    },
    {
      id: "Show Openning Line",
      component: (
        <AnswerFromGPT type="openning_line" user2_email={state.email} />
      ),
      trigger: "Another Help",
    },
    {
      id: "Show Chat Analysis",
      component: (
        <AnswerFromGPT type="chat_analysis" user2_email={state.email} />
      ),
      trigger: "Another Help",
      delay: 5000,
    },
    {
      id: "Another Help",
      message: "Can I help you with something else?",
      trigger: "If Return To Show Menu",
    },
    {
      id: "If Return To Show Menu",
      options: [
        { value: "Yes", label: "Yes", trigger: "Show Menu" },
        { value: "No", label: "No", trigger: "bye bye" },
      ],
    },
    {
      id: "bye bye",
      message: "I was happy to help, goodbye",
      end: true,
    },
  ];
  return (
    <>
      <div className={classes.chatBot}>
        <ChatBot
          hideSubmitButton="true"
          headerTitle="Your AI Assist"
          width="450px"
          botAvatar={botIcon}
          userAvatar={state.myPic}
          steps={steps}
        />
      </div>
    </>
  );
}

export default ChatBotComp;

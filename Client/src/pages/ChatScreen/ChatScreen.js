import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./ChatScreen.module.css";
import { Link, useLocation } from "react-router-dom";

const ChatScreen = () => {
  const [input, setInput] = useState("");
  let { state } = useLocation();
  const [messages, setMessages] = useState([
    {
      name: state.name,
      image:state.pic,
      message: "Hey there! I can't believe I matched with someone as amazing as you. 😊",
    },
    {
      image:state.myPic,
      message: "Hi Alex! Thanks, that's really sweet of you to say.",
    },
    {
      name: state.name,
      image:state.pic,
      message: "I just have this feeling that you're different from everyone else I've met. You're not like those other people on this app who just play games.",
    },
    {
      image:state.myPic,
      message: "Well, I'm here to meet new people and hopefully find someone special.",
    },

    {
      name: state.name,
      image:state.pic,
      message: "Wow, I'm really glad we matched then. I've been hurt so many times in the past, Emma. It's been really tough for me.",
    },
    {
      image:state.myPic,
      message: " I'm sorry to hear that, Alex. It's tough out there for everyone.",
    },
    {
      name: state.name,
      image:state.pic,
      message: " Yeah, it's just that I'm so sensitive, you know? I hope you won't hurt me like the others did. I trust you, Emma.",
    },
    {
      image:state.myPic,
      message: " I would never want to hurt anyone intentionally. We should take things slow and get to know each other better.",
    },
    {
      name: state.name,
      image:state.pic,
      message: "I'm just scared of getting hurt again. I hope you're not like those people who make promises and then break them.",
    },
    {
      image:state.myPic,
      message: "I understand your concerns, but we should give this a chance without any preconceived notions. Trust has to be built over time",
    },
    {
      name: state.name,
      image:state.pic,
      message: " I know, Emma, but if you really cared about me, you'd reassure me more. I just need to know you're not like the others",
    },
    {
      image:state.myPic,
      message: " I'm being honest when I say I'm not like the others, but I also don't want to feel pressured into making promises I can't keep",
    },
    {
      name: state.name,
      image:state.pic,
      message: "You're right, Emma. I'm sorry; I didn't mean to make you uncomfortable. I just care about you so much already",
    },
    {
      image:state.myPic,
      message: "It's okay, Alex. Let's just take it step by step and see where this goes.",
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    setMessages([...messages, { image:state.myPic, message: input }]);
    setInput("");
  };
  return (
    <div className={styles.chatScreen}>
      <p className={styles.chatScreen__timestamp}>
        YOU MATCHED WITH {state.name} ON 08/21/2020
      </p>
      {messages.map((message, index) =>
        message.name ? (
          <div className={styles.chatScreen__message} key={index}>
            <Avatar
              className={styles.chatScreen__image}
              alt={message.name}
              src={message.image}
            />
            <p className={styles.chatScreen__text}>{message.message}</p>
          </div>
        ) : (
          <div className={styles.chatScreen__message} key={index}>
            <p className={styles.chatScreen__owntext}>{message.message}</p>
             <Avatar
              className={styles.chatScreen__image2}
              src={message.image}
            />
            
          </div>
        )
      )}
      <form className={styles.chatScreen__form}>
        <input
          className={styles.chatScreen__input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          type="submit"
          className={styles.chatScreen__button}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;

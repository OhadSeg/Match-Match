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
      message: "Hey",
    },
    {
      name: state.name,
      image:state.pic,
      message: "How are you ?",
    },
    {
      message: "yo",
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    setMessages([...messages, { message: input }]);
    setInput("");
  };
  return (
    <div className={styles.chatScreen}>
      <p className={styles.chatScreen__timestamp}>
        YOU MATCHED WITH {state.name} ON 08/21/2020
      </p>
    <div className={styles.buttonContainer}>
    <Link to="/game" className={styles.link}>
      <button className={styles.match_button}>Match Date</button>
    </Link>
    <Link to={"/trivia"}>
    <button className={styles.match_button}>Trivia</button>
    </Link>
    <Link to={"/chatbot"}>
    <button className={styles.match_button}>ChatBot Assist</button>
    </Link>
  </div>
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

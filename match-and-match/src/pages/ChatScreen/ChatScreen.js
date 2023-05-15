import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import styles from "./ChatScreen.module.css";

const ChatScreen = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Labrador",
      image:
        "https://gooddoggies.online/wp-content/uploads/2020/06/5-Tips-To-Training-A-Labrador-Puppy-1.jpg",
      message: "Hey",
    },
    {
      name: "Labrador",
      image:
        "https://gooddoggies.online/wp-content/uploads/2020/06/5-Tips-To-Training-A-Labrador-Puppy-1.jpg",
      message: "Bork bork bork",
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
        YOU MATCHED WITH LABRADOR ON 08/21/2020
      </p>
      {messages.map((message) =>
        message.name ? (
          <div className={styles.chatScreen__message}>
            <Avatar
              className={styles.chatScreen__image}
              alt={message.name}
              src={message.image}
            />
            <p className={styles.chatScreen__text}>{message.message}</p>
          </div>
        ) : (
          <div className={styles.chatScreen__message}>
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

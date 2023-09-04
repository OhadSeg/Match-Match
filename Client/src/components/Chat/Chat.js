import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import styles from "./Chat.module.css";

const Chat = ({ name, message, profilePic, timestamp }) => {
  const userDetails = {
    name: name,
    pic: profilePic
  }
  return (
    <Link to={{
      pathname: `/chat/${name}`,
    }}
      state= { userDetails }
    >
      <div className={styles.chat}>
        <Avatar className={styles.chat__image} src={profilePic} />
        <div className={styles.chat__details}>
          <h2>{name}</h2>
          <p>{message}</p>
        </div>
        <p className={styles.chat__timestamp}>{timestamp}</p>
      </div>
    </Link>
  );
};

export default Chat;

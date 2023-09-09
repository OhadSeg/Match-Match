import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import styles from "./Chat.module.css";
import chatIcon from "./chat-icon.png";
import botIcon from "./robot-icon.png";
import gameIcon from "./board-game-icon.png";

const Chat = ({ name, email, message, profilePic, timestamp, myName, myPic }) => {
  const userDetails = {
    name: name,
    email: email,
    pic: profilePic,
    myName: myName,
    myPic: myPic
  }

  const buttonBorderStyle = {
    border: "2px solid #f0f0f0",
    margin: "0 10px",
  };


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
        <div>
          <IconButton color="primary" className={styles.chat__icon} style={buttonBorderStyle}>
          <img src={chatIcon} alt="Icon" width="50" height="50" />
          </IconButton>
          <Link to={{
          pathname: `/gameMenu`,
            }}
          state= { userDetails }
          >
          <IconButton color="primary" className={styles.chat__icon} style={buttonBorderStyle}>
          <img src={gameIcon} alt="Icon" width="50" height="50" />
          </IconButton>
          </Link>
          <Link to={{
          pathname: `/chatbot`,
            }}
          state= { userDetails }
          >
          <IconButton color="primary" className={styles.chat__icon} style={buttonBorderStyle}>
            {/* Add your base icon here */}
            <img src={botIcon} alt="Icon" width="50" height="50" />
          </IconButton>
          </Link>
        </div>
        <p className={styles.chat__timestamp}>{timestamp}</p>
      </div>
    </Link>
  );
};

export default Chat;

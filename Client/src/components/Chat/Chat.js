import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import styles from "./Chat.module.css";
import assistIcon from "../../pages/ChatBot/bot-avatar.png"
import chatIcon from "./chat-icon.png";
import gameIcon from "./board-game-icon.png";

const Chat = ({ name, message, profilePic, timestamp }) => {
  const userDetails = {
    name: name,
    pic: profilePic
  }

  const buttonBorderStyle = {
    border: "2px solid #f0f0f0", // Customize the border properties as needed
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
          <IconButton color="primary" style={buttonBorderStyle}>
          <img src={chatIcon} alt="Icon" width="70" height="70" />
          </IconButton>
          <IconButton color="primary" style={buttonBorderStyle}>
          <img src={gameIcon} alt="Icon" width="70" height="70" />
          </IconButton>
          <IconButton color="primary" style={buttonBorderStyle}>
            {/* Add your base icon here */}
            <img src={assistIcon} alt="Icon" width="70" height="70" />
          </IconButton>
        </div>
        <p className={styles.chat__timestamp}>{timestamp}</p>
      </div>
    </Link>
  );
};

export default Chat;

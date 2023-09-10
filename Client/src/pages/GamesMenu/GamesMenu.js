import React from "react";
import { Link } from "react-router-dom";
import styles from "./GamesMenu.module.css"; // Import a CSS file for styling
import IconButton from "@mui/material/IconButton";
import triviaIcon from "./trivia-icon.png";
import ticTacToeIcon from "./tic-tac-toe-icon.png";

function GamesMenu() {
  const buttonBorderStyle = {
    border: "2px solid #f0f0f0",
    margin: "0 10px",
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Welcome to Our Games Page</div>
      <div className={styles.chat}>
        <div className={styles.chat__image}>
          <IconButton color="primary" style={buttonBorderStyle}>
            <Link
              to={{
                pathname: "/trivia",
              }}
            >
              <img src={triviaIcon} alt="Icon" width="50" height="50" />
            </Link>
          </IconButton>
          <IconButton color="primary" style={buttonBorderStyle}>
            <Link
              to={{
                pathname: "/game",
              }}
            >
              <img src={ticTacToeIcon} alt="Icon" width="50" height="50" />
            </Link>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default GamesMenu;

import React from 'react';
import classes from './Popup.module.css';
import { Link } from "react-router-dom";

function MatchPopup({ userData, onClose }) {
    console.log(userData)
    return (
        <div className={classes.matchPopup}>
            <img src={userData.mathcedUser.pic} alt="Match" className={classes.matchImage} />
            <h1 className={classes.matchTitle}>You Have Match With {userData.mathcedUser.name}</h1>            <div className={classes.buttonContainer}>
            <Link to={"/chat"}>
                <button className={classes.matchButton} onClick={onClose}>
                    Chat Now
                </button>
            </Link>
                <button className={classes.matchButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default MatchPopup;

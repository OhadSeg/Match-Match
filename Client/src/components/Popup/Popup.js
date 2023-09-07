import React from 'react';
import classes from './Popup.module.css';

function MatchPopup({ userData, onClose }) {
    return (
        <div className={classes.matchPopup}>
            <h1 className={classes.matchTitle}>It's a Match!</h1>
            <p className={classes.matchMessage}>You and your match have both swiped right.</p>
            <button className={classes.matchButton} onClick={onClose}>
                Chat Now
            </button>
            <button className={classes.matchButton} onClick={onClose}>
                Close
            </button>
        </div>
    );
}

export default MatchPopup;
import React from 'react';
import classes from './Profile.module.css' // CSS file for styling
import AuthContext from "../../store/auth-context";
import {useContext} from "react";

const Profile = () => {

    const autCtx = useContext(AuthContext);
    const { email,password,fName, lName, hobby, favoriteFood, musicType, vacationSpot, image } = autCtx.loggedInUser;
    console.log(autCtx.loggedInUser);
    return (
        <div className={classes.profileContainer}>
            <div className={classes.profileHeader}>
                <h1>{fName} {lName}</h1>
                <p>{email}</p>
                <img src={image} alt='userImage'></img>
            </div>
            <div className={classes.profileDetailes}>
                <h2>About Me</h2>
                <div>
                    <strong>Hobby:</strong> {hobby}
                </div>
                <div>
                    <strong>Favorite Food:</strong> {favoriteFood}
                </div>
                <div>
                    <strong>Favorite Music:</strong> {musicType}
                </div>
                <div>
                    <strong>Favorite Location Spot:</strong> {vacationSpot}
                </div>
            </div>
        </div>
    );
}

export default Profile;
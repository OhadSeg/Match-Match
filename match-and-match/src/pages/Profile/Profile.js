import React from 'react';
import classes from './Profile.module.css' // CSS file for styling
import AuthContext from "../../store/auth-context";
import {useContext} from "react";
import {  useNavigate  } from "react-router-dom";

const Profile = () => {
    const authCtx = useContext(AuthContext);
    const navigate= useNavigate();
    const { email,fName, lName, hobby, favoriteFood, musicType, vacationSpot, image } = authCtx.loggedInUser;
    console.log(authCtx.loggedInUser);
    const logoutHandler = (event) => {
        event.preventDefault();
        authCtx.onLogout();
        console.log("check if user loggedout on back")
        console.log(authCtx.loggedInUser);
        navigate("/");
      };
    return (
        <div className={classes.profileContainer}>
            <div className={classes.profileHeader}>
                <h1>{fName} {lName}</h1>
                <p>{email}</p>
                <img src={image} alt='userImage'></img>
                <button onClick={logoutHandler}>Logout</button>

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
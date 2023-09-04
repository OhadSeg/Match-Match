import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css'
import { UsersContext } from "../../store/usersContext";
import {useContext} from "react";
import {  useNavigate  } from "react-router-dom";
import instance from "../../rest-utils"

const Profile = () => {
    const { setIsLoggedIn, token, setToken } = useContext(UsersContext)
    const navigate= useNavigate();
    const [user, setUser] = useState({});


    useEffect(() => {
        const token2 = token || window.localStorage.getItem('token')
        setToken(token2)
        instance.get('/users/getUserDetails',{
            headers:
                {"Authorization" : `Bearer ${token2}` }
        }).then((resp) => {
            setUser(resp.data)
        })
    },[])
    
    const logoutHandler = (event) => {
        event.preventDefault();
        setIsLoggedIn(false)
        window.localStorage.removeItem('token')
        navigate('/');     
      };
    return (
        <div className={classes.profileContainer}>
            <div className={classes.profileHeader}>
                <h1>{user.fname} {user.lname}</h1>
                <p>{user.email}</p>
                <img src={user.myPic} alt='userImage'></img>


            </div>
            <div className={classes.profileDetailes}>
                <h2>About Me</h2>
                <div>
                    <strong>Age:</strong> {user.age}
                </div>
                <div>
                    <strong>Gender:</strong> {user.gender}
                </div>
                <div>
                    <strong>Residence:</strong> {user.residence}
                </div>
                <div>
                    <strong>Hobby:</strong> {user.hobby}
                </div>
                <div>
                    <strong>Favorite Food:</strong> {user.favorite_food}
                </div>
                <div>
                    <strong>Favorite Music:</strong> {user.favorite_music}
                </div>
                <div>
                    <strong>Favorite Location Spot:</strong> {user.favorite_vacation_spot}
                </div>
                <div>
                    <strong>Interested in:</strong> {user.interested_in}
                </div>
            </div>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default Profile;





// import React, { useEffect, useState } from 'react';
// import classes from './Profile.module.css'
// import { UsersContext } from "../../store/usersContext";
// import {useContext} from "react";
// import {  useNavigate  } from "react-router-dom";
// import instance from "../../rest-utils"

// const Profile = () => {
//     const { setIsLoggedIn, token, setToken } = useContext(UsersContext)
//     const navigate= useNavigate();
//     const [user, setUser] = useState({});


//     useEffect(() => {
//         const token2 = token || window.localStorage.getItem('token')
//         setToken(token2)
//         instance.get('/users/getUserDetails',{
//             headers:
//                 {"Authorization" : `Bearer ${token2}` }
//         }).then((resp) => {
//             setUser(resp.data)
//         })
//     },[])
    
//     const logoutHandler = (event) => {
//         event.preventDefault();
//         setIsLoggedIn(false)
//         window.localStorage.removeItem('token')
//         navigate('/');     
//       };
//     return (
//         <div className={classes.profileContainer}>
//             <div className={classes.profileHeader}>
//                 <h1>{user.fname} {user.lname}</h1>
//                 <p>{user.email}</p>
//                 <img src={user.myPic} alt='userImage'></img>
//                 <button onClick={logoutHandler}>Logout</button>

//             </div>
//             <div className={classes.profileDetailes}>
//                 <h2>About Me</h2>
//                 <div>
//                     <strong>Age:</strong> {user.age}
//                 </div>
//                 <div>
//                     <strong>Gender:</strong> {user.gender}
//                 </div>
//                 <div>
//                     <strong>Residence:</strong> {user.residence}
//                 </div>
//                 <div>
//                     <strong>Hobby:</strong> {user.hobby}
//                 </div>
//                 <div>
//                     <strong>Favorite Food:</strong> {user.favorite_food}
//                 </div>
//                 <div>
//                     <strong>Favorite Music:</strong> {user.favorite_music}
//                 </div>
//                 <div>
//                     <strong>Favorite Location Spot:</strong> {user.favorite_vacation_spot}
//                 </div>
//                 <div>
//                     <strong>Interested in:</strong> {user.interested_in}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Profile;
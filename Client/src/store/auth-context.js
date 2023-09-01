import React, { useState, useEffect } from "react";
let usersData = [
  {
    email: "idan@gmail.com",
    password: "idancohen",
    fname: "Idan",
    lname: "Cohen",
    age: "28",
    gender: "Female",
    residence: "Jerusalem",
    hobby: "basketball",
    favorite_food: "pizza",
    favorite_music: "rap",
    favorite_vacation_spot: "madrid",
    interested_in: "Male",
    myPic:"https://scontent.ftlv20-1.fna.fbcdn.net/v/t39.30808-6/245628574_6703347393016523_4021478128689167373_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PG1amcxiqcYAX-81zqd&_nc_ht=scontent.ftlv20-1.fna&oh=00_AfAxGeaULyLj1dsO-JSs5ZAzI9rTknVuRWE1t-59ZWkHrw&oe=646DEA4B"
    
  },
  {
    email: "eran@gmail.com",
    password: "eranyosfia",
    fname: "Eran",
    lname: "Yosfia",
    age: "28",
    gender: "Female",
    residence: "Jerusalem",
    hobby: "math",
    favorite_food: "rice",
    favorite_music: "soul",
    favorite_vacation_spot: "paris",
    interested_in: "Male",
    myPic:"https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.18169-9/13254457_1301885369839391_8807267142125626618_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=E99fxR5wv64AX-kTP4h&_nc_ht=scontent.ftlv20-1.fna&oh=00_AfCZOcYtv4JX8D55-SFwhHWlps1lEDpPw7THloPwopYBYQ&oe=64903972",
  },
];
const AuthContext = React.createContext({
  isLoggedIn: false,
  loggedInUser: {},
  onLogout: () => {},
  onLogin: () => {},
  onSignUp:()=>{},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setloggedInUser] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    age: "",
    gender: "",
    residence: "",
    hobby: "",
    favorite_food: "",
    favorite_music: "",
    favorite_vacation_spot: "",
    interested_in: "",
    //image:"",
  });

  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  //   if (storedUserLoggedInInformation === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  useEffect(() => {
    console.log("loggedInUser changed ");
    console.log(loggedInUser);
    console.log(usersData);
  }, [loggedInUser]);

  const logoutHandler = () => {
    // localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setloggedInUser({
      email: "",
      password: "",
      fname: "",
      lname: "",
      age: "",
      gender: "",
      residence: "",
      hobby: "",
      favorite_food: "",
      favorite_music: "",
      favorite_vacation_spot: "",
      interested_in: "",
      myPic:"",
    });
  };
 
  const loginHandler = () => {
    // localStorage.setItem('isLoggedIn', '1');
    // Currently not checking valid user, or from dummy data, or registrated before
    setIsLoggedIn(true);
    // console.log("*** check if saving signuped user to list users valid ***");
    //console.log(usersData[2].email);
    //const userLogged = usersData.find((user) => user.email === email);
    // setloggedInUser({
    //   email: userLogged.email,
    //   password: userLogged.password,
    //   fname: userLogged.fname,
    //   lname: userLogged.lname,
    //   age: userLogged.age,
    //   gender: userLogged.gender,
    //   residence: userLogged.residence,
    //   hobby: userLogged.hobby,
    //   favorite_food: userLogged.favorite_food,
    //   favorite_music: userLogged.favorite_music,
    //   favorite_vacation_spot: userLogged.favorite_vacation_spot,
    //   interested_in: userLogged.interested_in,
    //   myPic: userLogged.myPic,
    // });

    console.log(loggedInUser);
  };

  const signUpHandler = (user) => {
    console.log("*** signup handler ***");
    console.log(user);
    usersData.push(user);
    console.log("*** notice user list ***");
    console.log(usersData);
    console.log("*** notice user list ***");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignUp: signUpHandler,
        loggedInUser:loggedInUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

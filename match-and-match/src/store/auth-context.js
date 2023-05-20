import React, { useState, useEffect } from "react";
let usersData = [
  {
    email: "idan@gmail.com",
    password: "idancohen",
    fName: "Idan",
    lName: "Cohen",
    hobby: "basketball",
    favoriteFood: "pizza",
    musicType: "rap",
    vacationSpot: "madrid",
    image:"https://scontent.ftlv20-1.fna.fbcdn.net/v/t39.30808-6/245628574_6703347393016523_4021478128689167373_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PG1amcxiqcYAX-81zqd&_nc_ht=scontent.ftlv20-1.fna&oh=00_AfAxGeaULyLj1dsO-JSs5ZAzI9rTknVuRWE1t-59ZWkHrw&oe=646DEA4B"
    
  },
  {
    email: "eran@gmail.com",
    password: "eranyosfia",
    fName: "Eran",
    lName: "Yosfia",
    hobby: "math",
    favoriteFood: "rice",
    musicType: "soul",
    vacationSpot: "paris",
    image:"https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.18169-9/13254457_1301885369839391_8807267142125626618_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=E99fxR5wv64AX-kTP4h&_nc_ht=scontent.ftlv20-1.fna&oh=00_AfCZOcYtv4JX8D55-SFwhHWlps1lEDpPw7THloPwopYBYQ&oe=64903972",
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
    fName: "",
    lName: "",
    hobby: "",
    favoriteFood: "",
    musicType: "",
    vacationSpot: "",
    image:"",
  });

  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  //   if (storedUserLoggedInInformation === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  useEffect(() => {
    console.log("loggedInUser changed !");
    console.log(loggedInUser);
    console.log(usersData);
  }, [loggedInUser]);

  const logoutHandler = () => {
    // localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
 
  const loginHandler = (email, password) => {
    // localStorage.setItem('isLoggedIn', '1');
    // Currently not checking valid user, or from dummy data, or registrated before
    console.log("*** check valid login params ***");
    console.log(email);
    console.log(password);
    setIsLoggedIn(true);
    // console.log("*** check if saving signuped user to list users valid ***");
    //console.log(usersData[2].email);
    const userLogged = usersData.find((user) => user.email === email);
    console.log("*** login handler ***");
    console.log(userLogged);
    setloggedInUser({
      email: userLogged.email,
      password: userLogged.password,
      fName: userLogged.fName,
      lName: userLogged.lName,
      hobby: userLogged.hobby,
      favoriteFood: userLogged.favoriteFood,
      musicType: userLogged.musicType,
      vacationSpot: userLogged.vacationSpot,
      image:userLogged.image,
    });

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

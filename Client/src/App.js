import "./App.css";
import ChatScreen from "./pages/ChatScreen/ChatScreen";
import ChatsPage from "./pages/Chats/Chats";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root";
import Login from "./pages/Login/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from './store/auth-context';
import { UsersContext } from "./store/usersContext";
import { useContext, useState, useEffect } from "react";
import SignUp from "./pages/SignUp/SignUp";
import Game from "./components/tic-tac-toe/Game/Game"
import Profile from "./pages/Profile/Profile";
import Trivia from "./pages/Trivia/Trivia";
import ChatBotComp from "./pages/ChatBot/chatBot"
import instance from "../src/rest-utils"
import Axios from 'axios';

function App() {
  const [user, setUser] = useState({});

  Axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   instance.get('/users/login').then((resp) => {
  //     if(resp.data.loggedIn === true){
  //         setUser(resp.data.user)
  //     }
  //   })
    
  // },[])
  //const isLoggedIn = window.localStorage.getItem('LOGGED_IN')

  //const authCtx = useContext(AuthContext);

  //let isLoggedIn = authCtx.isLoggedIn

  const { isLoggedIn, setIsLoggedIn } = useContext(UsersContext)

  if(isLoggedIn === false){
    const token = window.localStorage.getItem('token')
    if(token !== null){
      setIsLoggedIn(true)
    }
  }
  const toRender = window.localStorage.getItem('token') !== null ? <HomePage /> : <Login />;
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        //{ path: '/', element: <HomePage /> },
        //{path: '/login', element: <Login />},
        { path: '/', element: toRender},
        { path: '/chat', element: <ChatsPage /> },
        { path: '/chat/:person', element: <ChatScreen/>},
        {path:'/registration', element: <SignUp/>},
        {path:'/game', element: <Game/>},
        {path:'/profile',element:<Profile/>},
        {path:'/trivia',element:<Trivia/>},
        {path: '/chatbot',element:<ChatBotComp/>}
      ]
    }
  ]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
import "./App.css";
import ChatScreen from "./pages/ChatScreen/ChatScreen";
import ChatsPage from "./pages/Chats/Chats";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root";
import Login from "./pages/Login/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UsersContext } from "./store/usersContext";
import { useContext } from "react";
import SignUp from "./pages/SignUp/SignUp";
import Game from "./components/tic-tac-toe/Game/Game"
import Profile from "./pages/Profile/Profile";
import Trivia from "./pages/Trivia/Trivia";
import ChatBotComp from "./pages/ChatBot/chatBot"

function App() {

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
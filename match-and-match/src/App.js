import "./App.css";
import ChatScreen from "./pages/ChatScreen/ChatScreen";
import ChatsPage from "./pages/Chats/Chats";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root";
import Login from "./pages/Login/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from './store/auth-context';
import { useContext } from "react";
import SignUp from "./pages/SignUp/SignUp";
import Game from "./components/tic-tac-toe/Game/Game"
import Profile from "./pages/Profile/Profile";
import Trivia from "./pages/Trivia/Trivia";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn)
  const toRender = authCtx.isLoggedIn ? <HomePage /> : <Login />;
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        // { path: '/', element: <Login /> },
        // {path: '/home', element: <HomePage />},
        { path: '/', element: toRender},
        { path: '/chat', element: <ChatsPage /> },
        { path: '/chat/:person', element: <ChatScreen/>},
        {path:'/registration', element: <SignUp/>},
        {path:'/game', element: <Game/>},
        {path:'/profile',element:<Profile/>},
        {path:'/trivia',element:<Trivia/>}
      ]
    }
  ]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

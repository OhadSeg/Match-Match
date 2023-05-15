import "./App.css";
import ChatScreen from "./pages/ChatScreen/ChatScreen";
import ChatsPage from "./pages/Chats/Chats";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RootLayout from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/chat', element: <ChatsPage /> },
      { path: '/chat/:person', element: <ChatScreen/>},
      { path: '/login', element: <LoginPage/> }
    ]
  }
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

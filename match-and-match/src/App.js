import "./App.css";
import ChatsPage from "./pages/Chats/Chats";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/chat', element: <ChatsPage /> },
    ],
  }
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

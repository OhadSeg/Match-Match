import "./App.css";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
    
    ],
  }
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
import {
    createBrowserRouter,
  } from "react-router";
import Home from '../pages/Home/Home';
import App from '../App';
import About from "@/pages/About/About";


export const router = createBrowserRouter([
    {
      path: "/",
        Component: App,
        // errorElement: <ErrorPage/>,
        
        children: [
            {
                index: true,
                path:"/",
                Component: Home,
            },
            {
                index: true,
                path:"/about",
                Component: About ,
            },
          
      ]
    },
]);
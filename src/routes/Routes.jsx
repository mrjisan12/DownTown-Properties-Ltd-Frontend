import {
    createBrowserRouter,
  } from "react-router";
import Home from '../pages/Home/Home';
import App from '../App';
import About from "@/pages/About/About";
import Projects from "@/pages/Projects/Projects";
import DetailProject from "@/pages/Projects/DetailProject/DetailProject";


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
            {
                index: true,
                path:"/projects",
                Component: Projects ,
            },
            {
                index: true,
                path:"/project/:id",
                Component: DetailProject ,
            },
          
      ]
    },
]);
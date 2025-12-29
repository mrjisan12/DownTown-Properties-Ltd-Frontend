import {
    createBrowserRouter,
  } from "react-router";
import Home from '../pages/Home/Home';
import App from '../App';
import About from "@/pages/About/About";
import Projects from "@/pages/Projects/Projects";
import Contact from "@/pages/Contact/Contact";
import Gallery from "@/pages/Gallery/Gallery";


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
                path:"/contact",
                Component: Contact ,
            },
            {
                index: true,
                path:"/gallery",
                Component: Gallery ,
            },
            {
                index: true,
                path:"/projects",
                Component: Projects ,
            },
          
      ]
    },
]);
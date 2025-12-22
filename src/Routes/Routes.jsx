import React from 'react';
import {
    createBrowserRouter,
  } from "react-router";
import Root from '../pages/Root/Root';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Projects from '../components/Projects/Projects';
import Gallery from '../components/Gallery/Gallery';
import Contact from '../components/Contact/Contact';


export const router = createBrowserRouter([
    {
      path: "/",
        Component: Root,
        errorElement: <ErrorPage/>,
        
        children: [
            {
                index: true,
                path:"/",
                Component: Home,
            },
            {
                path: '/about',
                Component:About
            },
            {
                path: '/projects',
                Component:Projects
            },
            {
                path: '/gallery',
                Component:Gallery
            },
            {
                path: '/contact',
                Component:Contact
            },
      ]
    },
]);
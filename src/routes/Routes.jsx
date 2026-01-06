import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import App from "../App";
import About from "@/pages/About/About";
import Projects from "@/pages/Projects/Projects";
import DetailProject from "@/pages/Projects/DetailProject/DetailProject";
import Contact from "@/pages/Contact/Contact";
import Gallery from "@/pages/Gallery/Gallery";
import Testimonial from "@/pages/Testimonial/Testimonial";
import Terms from "@/pages/Terms_Privacy/Terms";
import Privacy from "@/pages/Terms_Privacy/Privacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // errorElement: <ErrorPage/>,

    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        index: true,
        path: "/about",
        Component: About,
      },
      {
        index: true,
        path: "/contact",
        Component: Contact,
      },
      {
        index: true,
        path: "/gallery",
        Component: Gallery,
      },
      {
        index: true,
        path: "/projects",
        Component: Projects,
      },
      {
        index: true,
        path: "/project/:id",
        Component: DetailProject,
      },
      {
        index: true,
        path: "/testimonial",
        Component: Testimonial,
      },
       {
        index: true,
        path: "/terms",
        Component: Terms,
      },
       {
        index: true,
        path: "/privacy",
        Component: Privacy,
      },
    ],
  },
]);

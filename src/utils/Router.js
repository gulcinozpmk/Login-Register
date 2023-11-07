import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";


const Router = createBrowserRouter([
    {
      path: "/",
      element: <Register/>,
    },
    {
      path: "/home",
      element:  <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
      },
  ]);

export default Router
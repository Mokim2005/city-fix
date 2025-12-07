import { createBrowserRouter } from "react-router-dom"; 
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import Error from "../Pages/Error";
import AllIssus from "../Pages/AllIssus";

import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />, 
      },
      {
        path: '/all-issus',
        Component: AllIssus
      },

    ],
  },
  {
    path:'/',
    element: <AuthLayout />,
    children: [
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'register',
            Component: Register
        }
    ]
  },
  {
    path: "*", 
    element: <Error />, 
  },
]);

export default router;

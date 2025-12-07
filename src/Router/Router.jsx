import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import Error from "../Pages/Error";
import AllIssus from "../Pages/AllIssus";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layout/AuthLayout";
import PrivetRout from "../Routs/PrivetRouts";
import IssueForm from "../Pages/IssusFrom";
import MyIssus from "../Pages/MyIssus";


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
        path: "/all-issus",
        Component: AllIssus,
      },
      {
        path: "/issus-form",
        element: (
          <PrivetRout>
            <IssueForm></IssueForm>
          </PrivetRout>
        ),
      },
      {
        path: "/my-issus",
        element: (
          <PrivetRout>
            <MyIssus></MyIssus>
          </PrivetRout>
        ),
      },

    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;

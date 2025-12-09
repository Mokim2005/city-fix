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
import MyIssus from "../Pages/Dashboard/MyIssus";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCanceld from "../Pages/Dashboard/PaymentCanceld";

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
    path: "dashboard",
    element: (
      <PrivetRout>
        <DashboardLayout></DashboardLayout>
      </PrivetRout>
    ),
    children: [
      {
        path: "my-issus",
        element: <MyIssus></MyIssus>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCanceld,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
export default router;

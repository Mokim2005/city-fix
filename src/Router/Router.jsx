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
import IssusDetails from "../Pages/IssusDetails";
import DashbordHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import UsersManagement from "../Pages/Dashboard/Admin/UserManagement";
import AdminRouts from "../Routs/AdminRouts";
import StaffRouts from "../Routs/StaffRouts";
import AssignedIssues from "../Pages/Dashboard/Staff/AssignedIssues";
import AllIssusTable from "../Pages/Dashboard/Admin/AllIssusTable";
import UserBlockManage from "../Pages/Dashboard/Admin/UserBlockManage";
import ManageStaff from "../Pages/Dashboard/Admin/ManageStaff";
import ViewPayments from "../Pages/Dashboard/Admin/ViewPayment";

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
        path: "/Issus-details/:id",
        element: (
          <PrivetRout>
            <IssusDetails></IssusDetails>
          </PrivetRout>
        ),
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
        index: true,
        Component: DashbordHome,
      },
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
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCanceld />,
      },
      //admin only routs
      {
        path: "user-management",
        element: (
          <AdminRouts>
            <UsersManagement></UsersManagement>
          </AdminRouts>
        ),
      },
      {
        path: "all-issus-table",
        element: (
          <AdminRouts>
            <AllIssusTable></AllIssusTable>
          </AdminRouts>
        ),
      },
      {
        path: "user-block-manage",
        element: (
          <AdminRouts>
            <UserBlockManage></UserBlockManage>
          </AdminRouts>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <AdminRouts>
            <ManageStaff></ManageStaff>
          </AdminRouts>
        ),
      },
      {
        path: "view-payments",
        element: (
          <AdminRouts>
            <ViewPayments></ViewPayments>
          </AdminRouts>
        ),
      },
      //staff only routs
      {
        path: "assigned-issues",
        element: (
          <StaffRouts>
            <AssignedIssues />
          </StaffRouts>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
export default router;

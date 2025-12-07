import { createBrowserRouter } from "react-router-dom"; 
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import Error from "../Pages/Error";
import AllIssus from "../Pages/AllIssus";

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
      }
    ],
  },
  {
    path: "*", 
    element: <Error />, 
  },
]);

export default router;

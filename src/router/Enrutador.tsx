import { createBrowserRouter } from "react-router-dom";
import Login  from "../pages/Login";
import Panel from "../pages/Home";
import Reports from "../pages/Reports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Panel />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
]);

export default router;
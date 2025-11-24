import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import ErrorPage from "./pages/ErrorPage";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
   errorElement: <ErrorPage />, 
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

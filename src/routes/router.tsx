import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/HomePage";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

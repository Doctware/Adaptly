import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Deploy from "./pages/Deploy";
import FeatureFlags from "./pages/FeatureFlags";
import Logs from "./pages/Logs";
import Login from "./pages/Login";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/deploy", element: <Deploy /> },
  { path: "/feature-flags", element: <FeatureFlags /> },
  { path: "/logs", element: <Logs /> },
  { path: "/login", element: <Login /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

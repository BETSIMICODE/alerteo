import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css"; // Assure-toi que ton fichier CSS est correctement lié

import AdminPage from "./pages/PageSuperAdmin/Adminpage";
import Dashboard from "./pages/PageSuperAdmin/Dashboard";
import { Home, Profile, SignIn, SignUp } from "./pages";
import { Navbar } from "@/widgets/layout"; // Assure-toi que ce composant existe
import routes from "@/routes"; // Assure-toi que ce fichier est bien configuré
import AdminManagement from "./pages/PageSuperAdmin/AdminManagement";

// Configuration des routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Profile />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/superadmin",
    element: <AdminPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "adminmanagement",
        element: <AdminManagement />, // Assure-toi que ce composant est défini
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

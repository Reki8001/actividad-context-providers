import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from "@/layout/Layout.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import HomePage from "@/pages/HomePage.tsx";

import { useAuth } from "@/context/AuthContext";
import AppProviders from "@/component/AppProviders";


function RequireAuth() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}


function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}


function Root() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,  
    children: [
      {
        element: <LayoutWrapper />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            element: <RequireAuth />,
            children: [
              {
                index: true, 
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
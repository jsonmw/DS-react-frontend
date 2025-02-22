import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import PublicRoute from "./PublicRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { AuthContextProvider } from "../context/AuthContext";

const AppRoutes = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default AppRoutes;

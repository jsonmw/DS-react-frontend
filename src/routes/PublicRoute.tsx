import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;

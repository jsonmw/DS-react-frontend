import { ReactNode } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Welcome from "../pages/welcome/Welcome";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
    console.log(isAuthenticated);
  return isAuthenticated ? children : <Welcome />;
};

export default ProtectedRoute;
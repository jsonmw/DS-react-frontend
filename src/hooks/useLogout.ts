import { useCallback, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signout } from "../services/auth-service";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const { updateAuth } = useAuthContext();

  const logout = useCallback(async () => {
    setLoader(true);
  
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;
  
    if (!token) {
      setError("No user logged in");
      setLoader(false);
      return;
    }
  
    try {
      const response = await signout();
      
      if (response && response.status === 204) {
        localStorage.clear();
        updateAuth(false);
        navigate("/");
      } else {
        setError("Unexpected response during logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setLoader(false);
    }
  }, [updateAuth, navigate]); 

  return { logout };
};

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signout } from "../services/auth-service";
import { Navigate, useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const { updateAuth } = useAuthContext();

  const logout = () => {
    setLoader(true);
    signout()
      .then((response) => {
        if (response && response.status === 204) {
          localStorage.clear();
          updateAuth(false);
          navigate("/");
        }
        setError("Unexpected response during logout");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
  };

  return { logout };
};

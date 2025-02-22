import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { AuthRequest } from "../model/AuthRequest";
import { authenticate } from "../services/auth-service";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const { updateAuth } = useAuthContext();

  const login = (authRequest: AuthRequest) => {
    setLoader(true);
    authenticate(authRequest)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        updateAuth(true);
        navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      })
      .finally(() => setLoader(false));
  };

  return { error, isLoading, login };
};

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { AuthRequest } from "../model/AuthRequest";
import { authenticate } from "../services/auth-service";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const { updateAuth } = useAuthContext();

  const login = useCallback(
    async (authRequest: AuthRequest) => {
      try {
        setError("");
        setLoader(true);

        const response = await authenticate(authRequest);

        if (!response?.data?.token) {
          throw new Error("Login attempt failed.");
        }

        localStorage.setItem("user", JSON.stringify(response.data));
        updateAuth(true);

        return true;
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Login attempt failed"
        );
        return false;
      } finally {
        setLoader(false);
      }
    },
    [updateAuth]
  );

  return { error, isLoading, login };
};

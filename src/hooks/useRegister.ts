import { useCallback, useState } from "react";
import { UserAccount } from "../model/UserAccount";
import { authenticate, createUserAccount } from "../services/auth-service";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const [toast, setToast] = useState<string>("");
  const { updateAuth } = useAuthContext();

  const register = useCallback(
    async (userAccount: UserAccount) => {
      try {
        setError("");
        setToast("");
        setLoader(true);

        const response = await createUserAccount(userAccount);
        if (response?.status !== 201) {
          throw new Error("Failed to create user account");
        }

        setToast("New user account has been successfully created");

        // Automatically log new user in upon successful creation
        const loginResponse = await authenticate({
          email: userAccount.email,
          password: userAccount.password,
        });

        if (!loginResponse?.data?.token) {
          throw new Error("New user login failed");
        }

        localStorage.setItem("user", JSON.stringify(loginResponse.data));
        localStorage.setItem("firstLogin", "true"); // to prompt modal
        updateAuth(true);

        return true;
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to create user account"
        );
        return false;
      } finally {
        setLoader(false);
      }
    },
    [updateAuth]
  );

  return { error, isLoading, register, toast };
};

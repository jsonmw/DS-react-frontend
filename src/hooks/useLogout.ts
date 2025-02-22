import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { logout } from "../services/auth-service";

export const useLogout = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const { updateAuth } = useAuthContext();

  const signout = () => {
    setLoader(true);
    logout()
      .then((response) => {
        if (response && response.status === 204) {
          localStorage.clear();
          updateAuth(false);
        }
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
  };

  return { signout };
};

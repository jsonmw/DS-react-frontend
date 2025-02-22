import { useCallback, useState } from "react"
import { UserAccount } from "../model/UserAccount";
import { createUserAccount } from "../services/auth-service";

export const useRegister = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setLoader] = useState<boolean>(false);
    const [toast, setToast] = useState<string>("");

    const register = useCallback((userAccount: UserAccount) => {
        // reset values before new attempt
        setError(""); 
        setToast("");
        setLoader(true);

        createUserAccount(userAccount)
            .then((response) => {
                if (response?.status === 201) {
                    setToast("New user has been successfully created");
                }
                console.log(response);
            })
            .catch((error) => {
                setError(error.response?.data?.message || error.message || "Failed to create account");
            })
            .finally(() => setLoader(false));
    }, []);

    return { error, isLoading, register, toast };

};
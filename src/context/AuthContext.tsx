import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  updateAuth: (flag: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  updateAuth: () => {},
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
  }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  
    // useEffect(() => {
    //   console.log("Auth state changed: ", isAuthenticated);
    // }, [isAuthenticated]); // Debugging auth state updates
  
    useEffect(() => {
      const authObject = localStorage.getItem("user");
      setAuthenticated(authObject !== null);
    }, []);
  
    const updateAuth = (flag: boolean) => {
      if (!flag) {
        localStorage.removeItem("user");
        setAuthenticated(false);
      }
  
      window.dispatchEvent(new Event("authChange"));
    };
  
    // Updates auth when cookie is deleted in another tab
    useEffect(() => {
      const handleAuthChange = () => {
        setAuthenticated(!!localStorage.getItem("user"));
      };
  
      const handleStorageChange = () => {
        setAuthenticated(!!localStorage.getItem("user"));
      };
  
      window.addEventListener("authChange", handleAuthChange);
      window.addEventListener("storage", handleStorageChange);
  
      return () => {
        window.removeEventListener("authChange", handleAuthChange);
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, updateAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };

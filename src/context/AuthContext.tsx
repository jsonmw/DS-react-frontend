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
  const updateAuth = (flag: boolean) => {
    setAuthenticated(flag);
  };

  useEffect(() => {
    const authObject = localStorage.getItem("user");
    if (authObject) {
      setAuthenticated(true);
    }
  }, []);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, updateAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };

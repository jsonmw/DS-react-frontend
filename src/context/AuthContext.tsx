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

  useEffect(() => {
    const authObject = localStorage.getItem("user");
    setAuthenticated(authObject !== null);
  }, []);

  const updateAuth = (flag: boolean) => {
    setAuthenticated(flag);
    if (flag) {
      localStorage.setItem("user", "true");
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

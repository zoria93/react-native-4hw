import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthStateProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};



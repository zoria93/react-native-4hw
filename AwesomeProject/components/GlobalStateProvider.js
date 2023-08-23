import React, { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalStateProvider = ({ children }) => {
  const [isRefetchedPosts, setIsRefetchedPosts] = useState(false);

  return (
    <GlobalContext.Provider value={{ isRefetchedPosts, setIsRefetchedPosts }}>
      {children}
    </GlobalContext.Provider>
  );
};

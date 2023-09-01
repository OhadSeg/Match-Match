import React, { useState, createContext  } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();

    return (
        <UsersContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            token,
            setToken,
          }}
        >
          {children}
        </UsersContext.Provider>
      );
};
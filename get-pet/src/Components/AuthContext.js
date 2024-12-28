import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (storedLoggedIn && storedUserId && storedUserName) {
      setLoggedIn(true);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  const login = (userId, userName) => {
    setLoggedIn(true);
    setUserId(userId);
    setUserName(userName);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  };
  const logout = () => {
    setLoggedIn(false);
    setUserId("");
    setUserName("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        userName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

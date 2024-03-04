import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
const [authData,setAuthData] = useState(null);
  const setAuthUser = (data) => {
    setUserData(data);
  };
  const logout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Clear user data from state
    setUserData(null);
  };
  return (
    <AuthContext.Provider value={{ userData, setAuthUser ,setUserData ,setAuthData ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

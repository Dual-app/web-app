import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (data) => {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    setAuth(null);
    localStorage.removeItem("auth");
  }
};

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

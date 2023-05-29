// @ts-nocheck
import { useContext } from "react";
const { createContext, useState } = require("react");

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUsers() {
  return useContext(AuthContext);
}

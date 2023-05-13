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

// export function useUsersDispatch() {
//   return useContext(UsersDispatchContext);
// }

// function usersReducer(state, action) {
//   switch (action.type) {
//     case "SET_USER": {
//       return { ...state, name: action.userName };
//     }
//     case "LOGIN": {
//       return { ...state, authorized: true };
//     }
//     default:
//       throw Error("Unknown action: " + action.type);
//   }
// }

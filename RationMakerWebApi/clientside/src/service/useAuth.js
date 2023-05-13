// @ts-nocheck
import { useDebugValue } from "react";
import { useUsers } from "../service/UserContext";

const useAuth = () => {
  const { auth } = useUsers();
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useUsers();
};

export default useAuth;

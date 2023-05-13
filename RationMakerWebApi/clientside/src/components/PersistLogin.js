import useAuth from "../service/useAuth";
import useRefreshToken from "../service/useRefreshToken";
import { Loading } from "./Loading";

const { default: React } = require("react");
const { useState, useEffect } = require("react");
const { Outlet } = require("react-router-dom");

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [auth.accessToken, refresh]);

  // useEffect(() => {
  //   console.log("isLoading: ", isLoading);
  //   console.log("aT: ", JSON.stringify(auth.accessToken));
  // }, [isLoading]);

  return isLoading ? <Loading /> : <Outlet />;
};

export default PersistLogin;

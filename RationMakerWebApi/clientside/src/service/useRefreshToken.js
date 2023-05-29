import { submitForm } from "../service/SubmitForm";
import { refreshToken } from "./ApiCalls";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await submitForm(refreshToken);
    setAuth((prev) => {
      return {
        ...prev,
        email: response.email,
        accessToken: response.accessToken,
      };
    });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

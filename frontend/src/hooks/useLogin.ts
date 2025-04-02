import toast from "react-hot-toast";
import { LoginData } from "../types/LoginData";
import { loginUser } from "../services/LoginApi";

type UseLoginReturn = {
  userLogin: () => Promise<void>;
};

export const useLogin = (loginData: LoginData): UseLoginReturn => {
  const userLogin = async () => {
    try {
      const userData = await loginUser(loginData);

      localStorage.setItem("jwt", JSON.stringify(userData.token));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed. Try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  return { userLogin };
};

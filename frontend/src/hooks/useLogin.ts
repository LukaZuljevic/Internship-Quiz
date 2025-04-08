import toast from "react-hot-toast";
import { LoginData } from "../types/LoginData";
import { loginUser } from "../services/LoginApi";
import { JwtResponseDto } from "@internship-quiz/app-types";

type UseLoginReturn = {
  userLogin: () => Promise<JwtResponseDto>;
};

export const useLogin = (loginData: LoginData): UseLoginReturn => {
  const userLogin = async () => {
    try {
      const userData = await loginUser(loginData);

      localStorage.setItem("jwt", JSON.stringify(userData.token));

      return userData;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed. Try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  return { userLogin };
};

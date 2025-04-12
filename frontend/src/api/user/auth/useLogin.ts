import { api } from "../../index";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { LOGIN_USER_PATH } from "../../../constants";
import { LoginData } from "../../../types/LoginData";
import { JwtResponseDto } from "../../../types/appGlobalTypes";

const loginUser = (loginData: LoginData) => {
  return api.post<LoginData, JwtResponseDto>(LOGIN_USER_PATH, loginData);
};

export const useLogin = (
  refreshUserState: () => void,
  navigate: () => void,
  clearForm: () => void
) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: (data: JwtResponseDto) => {
      localStorage.setItem("jwt", JSON.stringify(data.token));
      refreshUserState();
      clearForm();
      toast.success("Login successful!");
      navigate();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

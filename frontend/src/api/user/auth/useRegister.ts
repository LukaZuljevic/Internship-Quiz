import { api } from "../../index";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { REGISTER_USER_PATH } from "../../../constants";
import { RegistrationData } from "../../../types/RegistrationData";
import { JwtResponseDto } from "../../../types/appGlobalTypes";

const registerUser = (registrationData: RegistrationData) => {
  return api.post<RegistrationData, JwtResponseDto>(
    REGISTER_USER_PATH,
    registrationData
  );
};

export const useRegister = (navigate: () => void, clearForm: () => void) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    onSuccess: (data: JwtResponseDto) => {
      localStorage.setItem("jwt", JSON.stringify(data.token));
      toast.success("Registration successful!");
      clearForm();
      navigate();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

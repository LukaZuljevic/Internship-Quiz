import toast from "react-hot-toast";
import { registerUser } from "../services/RegisterApi";
import { RegistrationData } from "../types/RegistrationData";
import { JwtResponseDto } from "../types/appGlobalTypes";

type UseRegisterReturn = {
  userRegistration: () => Promise<JwtResponseDto>;
};

export const useRegister = (
  registrationData: RegistrationData
): UseRegisterReturn => {
  const userRegistration = async () => {
    try {
      const userData = await registerUser(registrationData);

      localStorage.setItem("jwt", JSON.stringify(userData.token));

      return userData;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  return { userRegistration };
};

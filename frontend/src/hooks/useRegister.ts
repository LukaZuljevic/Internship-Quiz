import { registerUser } from "../services/RegisterApi";
import { RegistrationData } from "../types/RegistrationData";

type UseRegisterReturn = {
  userRegistration: () => Promise<void>;
};

export const useRegister = (
  registrationData: RegistrationData
): UseRegisterReturn => {
  const userRegistration = async () => {
    try {
      await registerUser(registrationData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { userRegistration };
};

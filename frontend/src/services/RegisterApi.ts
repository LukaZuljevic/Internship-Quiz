import { JwtResponseDto } from "@internship-quiz/appTypes";
import { REGISTER_USER_PATH } from "../constants";
import { RegistrationData } from "../types/RegistrationData";

export const registerUser = async (
  registrationData: RegistrationData
): Promise<JwtResponseDto> => {
  const url = `${REGISTER_USER_PATH}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Registration failed.");

  return data;
};

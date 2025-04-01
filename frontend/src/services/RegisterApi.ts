import { REGISTER_USER_PATH } from "../constants";
import { RegistrationData } from "../types/RegistrationData";

export const registerUser = async (registrationData: RegistrationData) => {
  const url = `${REGISTER_USER_PATH}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) throw new Error(`Error registering the user`);

  const data = await response.json();

  console.log(data);

  return data;
};

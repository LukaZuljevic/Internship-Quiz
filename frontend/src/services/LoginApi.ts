import { JwtResponseDto } from "../types/appGlobalTypes";
import { LOGIN_USER_PATH } from "../constants";
import { LoginData } from "../types/LoginData";

export const loginUser = async (
  loginData: LoginData
): Promise<JwtResponseDto> => {
  const url = `${LOGIN_USER_PATH}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Login failed.");

  return data;
};

import { getDataFromToken } from "./getUserDataFromJwt";

export const isTokenExpired = (): boolean => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return true;

    const exp = getDataFromToken("exp");

    if (!exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);

    return exp < currentTime;
  } catch (error) {
    return true;
  }
};

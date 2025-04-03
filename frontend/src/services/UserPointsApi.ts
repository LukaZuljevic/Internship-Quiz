import { USER_PATH } from "../constants";
import { getDataFromToken } from "../utils/getUserDataFromJwt";

export const fetchUserPoints = async () => {
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const userEmail = getDataFromToken("email");

  const url = `${USER_PATH}/points/${userEmail}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Login failed.");

  return data;
};

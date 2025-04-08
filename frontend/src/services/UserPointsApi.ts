import { USER_PATH } from "../constants";
import { UserPointsResponseDto } from "@appTypes/types";

export const fetchUserPoints = async (
  email: string
): Promise<UserPointsResponseDto> => {
  const url = `${USER_PATH}/points/${email}`;
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

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

import { UserQuizAttemptAnswersResponseDto } from "../types/appGlobalTypes";
import { QUIZ_USER_ANSWERS } from "../constants";

export const fetchUserQuizAttempt = async (
  userId: string,
  quizId: string
): Promise<UserQuizAttemptAnswersResponseDto> => {
  const url = `${QUIZ_USER_ANSWERS}/user/${userId}/quiz/${quizId}`;
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.message || "Fetching user quiz answers failed.");

  return data;
};

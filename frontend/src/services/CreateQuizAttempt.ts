import { QUIZ_USER_ANSWERS } from "../constants";
import { QuizAttempt } from "../types/QuizAttempt";

export const postQuizAttempt = async (request: QuizAttempt) => {
  const url = `${QUIZ_USER_ANSWERS}`;
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok)
    throw new Error(`Error posting quiz attempt: ${response.statusText}`);

  const data = await response.json();

  return data;
};

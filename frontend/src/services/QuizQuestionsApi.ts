import { QUIZ_QUESTIONS_PATH } from "../constants";

export const fetchQuizQuestions = async (quizId: string) => {
  const url = `${QUIZ_QUESTIONS_PATH}/${quizId}`;

  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Fetching failed.");

  return data;
};

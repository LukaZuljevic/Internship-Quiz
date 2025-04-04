import { QUIZ_API_PATH } from "../constants";
import { NewQuizRequest } from "../types/NewQuizRequest";

export const createNewQuiz = async ({ title, categoryId }: NewQuizRequest) => {
  const url = `${QUIZ_API_PATH}`;
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const request = {
    title,
    categoryId,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok)
    throw new Error(`Error creating new quiz: ${response.statusText}`);

  const data = await response.json();

  return data;
};

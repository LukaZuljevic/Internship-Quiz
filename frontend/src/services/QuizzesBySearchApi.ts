import { QuizResponseDto } from "@internship-quiz/appTypes";
import { QUIZ_API_PATH } from "../constants";

export const fetchQuizzesBySearch = async (
  search: string
): Promise<QuizResponseDto[]> => {
  const url = search ? `${QUIZ_API_PATH}/search/${search}` : `${QUIZ_API_PATH}`;
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

import { QUESTIONS_PATH } from "../constants";

export const fetchAllQuestions = async () => {
  const url = `${QUESTIONS_PATH}`;
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Error(`Error fetching questions: ${response.statusText}`);

  const data = await response.json();

  return data;
};

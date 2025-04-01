import { QUIZ_API_PATH } from "../constants";

export const fetchAllQuizes = async () => {
  const url = `${QUIZ_API_PATH}`;
  const token = localStorage.getItem("jwt");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Error(`Error fetching quizzes: ${response.statusText}`);

  const data = await response.json();

  console.log(data);

  return data;
};

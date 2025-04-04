import { QUIZ_QUESTION_API_PATH } from "../constants";

export type CreateQuizQuestionRequest = {
  quizId: string;
  questionId: string;
};

export const createQuizQuestion = async ({
  quizId,
  questionId,
}: CreateQuizQuestionRequest) => {
  const url = `${QUIZ_QUESTION_API_PATH}`;
  const token = JSON.parse(localStorage.getItem("jwt") || "null");

  const request = {
    quizId,
    questionId,
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
    throw new Error(`Error creating quiz questions: ${response.statusText}`);

  const data = await response.json();

  return data;
};

export const createQuizQuestions = async (
  quizId: string,
  questionIds: string[]
) => {
  const promises = questionIds.map((questionId) =>
    createQuizQuestion({ quizId, questionId })
  );

  return Promise.all(promises);
};

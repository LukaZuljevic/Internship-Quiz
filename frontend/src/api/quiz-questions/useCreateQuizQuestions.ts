import { api } from "../index";
import { useMutation } from "@tanstack/react-query";
import { QUIZ_QUESTIONS_PATH } from "../../constants";
import { Question } from "../../types/Question";
import { QuizQuestionsResponseDto } from "../../types/appGlobalTypes";

type CreateQuizQuestionRequest = {
  quizId: string;
  questionId: string;
};

type CreateQuizQuestionsParams = {
  quizId: string;
  questions: Question[];
};

const createQuizQuestion = (request: CreateQuizQuestionRequest) => {
  return api.post<CreateQuizQuestionRequest, QuizQuestionsResponseDto>(
    QUIZ_QUESTIONS_PATH,
    request
  );
};

const createQuizQuestions = async ({
  quizId,
  questions,
}: CreateQuizQuestionsParams) => {
  const questionIds = questions.map((question) => question.id);
  const results = questionIds.map((questionId) =>
    createQuizQuestion({ quizId, questionId })
  );

  return Promise.all(results);
};

export const useCreateQuizQuestions = () => {
  return useMutation({
    mutationKey: ["createQuizQuestions"],
    mutationFn: createQuizQuestions,
  });
};

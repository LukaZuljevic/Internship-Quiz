import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { QUIZ_QUESTIONS_PATH } from "../../constants";
import { QuizQuestionsResponseDto } from "../../types/appGlobalTypes";

const fetchQuizQuestions = (quizId: string) => {
  return api.get<never, QuizQuestionsResponseDto[]>(
    `${QUIZ_QUESTIONS_PATH}/${quizId}`
  );
};

export const useQuizQuestions = (quizId?: string) => {
  return useQuery({
    queryKey: ["quizQuestions", quizId],
    queryFn: () => fetchQuizQuestions(quizId!),
  });
};

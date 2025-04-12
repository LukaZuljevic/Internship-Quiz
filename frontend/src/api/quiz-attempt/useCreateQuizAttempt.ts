import { api } from "../index";
import { useMutation } from "@tanstack/react-query";
import { QUIZ_USER_ANSWERS } from "../../constants";
import { QuizAttempt } from "../../types/QuizAttempt";
import { UserQuizAttemptAnswersResponseDto } from "../../types/appGlobalTypes";

const createQuizAttempt = (request: QuizAttempt) => {
  return api.post<QuizAttempt, UserQuizAttemptAnswersResponseDto>(
    QUIZ_USER_ANSWERS,
    request
  );
};

export const useCreateQuizAttempt = () => {
  return useMutation({
    mutationKey: ["quizAttempt"],
    mutationFn: createQuizAttempt,
  });
};

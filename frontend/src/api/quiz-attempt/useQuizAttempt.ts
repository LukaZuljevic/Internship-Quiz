import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { QUIZ_USER_ANSWERS } from "../../constants";
import { QuizAttemptAnswers } from "../../types/QuizAttempt";
import { UserQuizAttemptAnswersResponseDto } from "../../types/appGlobalTypes";

const fetchUserQuizAttempt = (userId: string, quizId: string) => {
  return api.get<never, UserQuizAttemptAnswersResponseDto | null>(
    `${QUIZ_USER_ANSWERS}/user/${userId}/quiz/${quizId}`
  );
};

const mapQuizAttemptData = (
  data: UserQuizAttemptAnswersResponseDto | null
): QuizAttemptAnswers => {
  return {
    quizId: data?.quiz.id || "",
    userId: data?.user.id || "",
    points: data?.points || 0,
    answers: data?.answers || {},
  };
};

export const useQuizAttempt = (userId: string, quizId: string) => {
  return useQuery({
    queryKey: ["userQuizAttempt", userId, quizId],
    queryFn: () => fetchUserQuizAttempt(userId, quizId),
    select: mapQuizAttemptData,
    enabled: !!quizId,
  });
};

import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { QUIZ_USER_ANSWERS } from "../../constants";
import { QuizBasicAttemptInfo } from "../../types/QuizAttempt";
import { UserQuizBasicAttemptResponseDto } from "../../types/appGlobalTypes";

const fetchSolvedQuizzes = (userId: string) => {
  return api.get<never, UserQuizBasicAttemptResponseDto[]>(
    `${QUIZ_USER_ANSWERS}/user/${userId}`
  );
};

const mapSolvedQuizData = (
  data: UserQuizBasicAttemptResponseDto[]
): QuizBasicAttemptInfo[] => {
  return data.map((item) => ({
    quizId: item.quiz.id,
    userId: item.user.id,
    points: item.points,
  }));
};

export const useAllSolvedQuizzes = (userId: string) => {
  return useQuery({
    queryKey: ["solvedQuizzes", userId],
    queryFn: () => fetchSolvedQuizzes(userId),
    select: mapSolvedQuizData,
  });
};

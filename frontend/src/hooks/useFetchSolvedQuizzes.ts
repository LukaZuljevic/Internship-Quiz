import { QuizBasicAttemptInfo } from "../types/QuizAttempt";
import { fetchSolvedQuizzes } from "../services/UserQuizAttemptsApi";

type UseFetchSolvedQuizzesReturn = {
  fetchSolvedQuizzesData: (userId: string) => Promise<void>;
};

type UseFetchSolvedQuizzesProps = {
  setData: (items: QuizBasicAttemptInfo[]) => void;
  userId: string;
};

export const useFetchSolvedQuizzes = ({
  setData,
  userId,
}: UseFetchSolvedQuizzesProps): UseFetchSolvedQuizzesReturn => {
  const fetchSolvedQuizzesData = async () => {
    try {
      const fetchedData = await fetchSolvedQuizzes(userId);

      const mappedData: QuizBasicAttemptInfo[] = fetchedData.map((item) => {
        return {
          quizId: item.quiz.id,
          userId: item.user.id,
          points: item.points,
        };
      });

      setData(mappedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { fetchSolvedQuizzesData };
};

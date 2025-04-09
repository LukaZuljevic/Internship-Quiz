import { fetchUserQuizAttempt } from "../services/UserQuizAttempt";
import { QuizAttemptAnswers } from "../types/QuizAttempt";

type UseFetchUserQuizAttemptReturn = {
  fetchUserQuizAttemptData: (userId: string, quizId: string) => Promise<void>;
};

type UseFetchUserQuizAttemptProps = {
  setData: (items: QuizAttemptAnswers) => void;
  userId: string;
  quizId: string;
};

export const useFetchUserQuizAttempt = ({
  setData,
  userId,
  quizId,
}: UseFetchUserQuizAttemptProps): UseFetchUserQuizAttemptReturn => {
  const fetchUserQuizAttemptData = async () => {
    try {
      const fetchedData = await fetchUserQuizAttempt(userId, quizId);

      const mappedData: QuizAttemptAnswers = {
        quizId: fetchedData.quiz.id,
        userId: fetchedData.user.id,
        points: fetchedData.points,
        answers: fetchedData.answers,
      };

      setData(mappedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { fetchUserQuizAttemptData };
};

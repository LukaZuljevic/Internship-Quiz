import { QuizBasicAttemptInfo } from "../types/QuizAttempt";
import { fetchSolvedQuizzes } from "../services/SolvedQuizzesApi";
import { UserQuizBasicAttemptDto } from "@internship-quiz/appTypes";

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
      const fetchedData: UserQuizBasicAttemptDto[] = await fetchSolvedQuizzes(
        userId
      );

      const mappedData: QuizBasicAttemptInfo[] = fetchedData.map(
        (item: UserQuizBasicAttemptDto) => {
          return {
            quizId: item.quiz.id,
            userId: item.user.id,
            points: item.points,
          };
        }
      );

      setData(mappedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { fetchSolvedQuizzesData };
};

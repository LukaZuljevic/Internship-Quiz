import { fetchQuizQuestions } from "../services/QuizQuestionsApi";
import { QuizQuestion } from "../types/Question";

type useFetchQuizQuestionsReturn = {
  fetchQuizQuestionsData: (quizId: string) => Promise<void>;
};

type useFetchQuizQuestionsProps = {
  setData: (items: QuizQuestion[]) => void;
  quizId: string;
};

export const useFetchQuizQuestions = ({
  setData,
  quizId,
}: useFetchQuizQuestionsProps): useFetchQuizQuestionsReturn => {
  const fetchQuizQuestionsData = async () => {
    try {
      if (!quizId) return;
      const fetchedData = await fetchQuizQuestions(quizId);

      if (fetchedData) setData(fetchedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { fetchQuizQuestionsData };
};

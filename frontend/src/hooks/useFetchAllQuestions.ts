import { fetchAllQuestions } from "../services/AllQuestionsApi";
import { Question } from "../types/Question";

type UseFetchAllQuestionsReturn = {
  fetchAllQuestionsData: () => Promise<void>;
};

export const useFetchAllQuestions = (
  setData: (items: Question[]) => void
): UseFetchAllQuestionsReturn => {
  const fetchAllQuestionsData = async () => {
    try {
      const fetchedData = await fetchAllQuestions();

      if (fetchedData) setData(fetchedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { fetchAllQuestionsData };
};

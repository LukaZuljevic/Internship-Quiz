import { fetchAllQuizzes } from "../services/AllQuizzesApi";
import { Quiz } from "../types/Quiz";

type UseFetchAllQuizzesReturn = {
  fetchAllQuizzesData: () => Promise<void>;
};

export const useFetchAllQuizzes = (
  setData: (items: Quiz[]) => void
): UseFetchAllQuizzesReturn => {
  const fetchAllQuizzesData = async () => {
    try {
      const fetchedData = await fetchAllQuizzes();

      if (fetchedData) setData(fetchedData);
    } catch (error) {
      alert(`Error:  ${error}`);
    }
  };

  return { fetchAllQuizzesData };
};

//ovo ne koristis za sad, ako ne budes koristia ni kasnije izbrisi!!

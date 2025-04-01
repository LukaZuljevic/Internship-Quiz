import { fetchQuizzesBySearch } from "../services/QuizzesBySearchApi";
import { Quiz } from "../types/Quiz";

type UseFetchAllQuizzesReturn = {
  fetchQuizzesBySearchData: (search: string) => Promise<void>;
};

type UseFetchAllQuizzesProps = {
  setData: (items: Quiz[]) => void;
  search: string;
};

export const useFetchQuizzesBySearch = ({
  setData,
  search,
}: UseFetchAllQuizzesProps): UseFetchAllQuizzesReturn => {
  const fetchQuizzesBySearchData = async () => {
    try {
      const fetchedData = await fetchQuizzesBySearch(search);

      if (fetchedData) setData(fetchedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { fetchQuizzesBySearchData };
};

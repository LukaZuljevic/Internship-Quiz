import { fetchAllCategories } from "../services/AllCategoriesApi";
import { Category } from "../types/Category";

type UseFetchAllCategoriesReturn = {
  fetchAllCategoriesData: () => Promise<void>;
};

export const useFetchAllCategories = (
  setData: (items: Category[]) => void
): UseFetchAllCategoriesReturn => {
  const fetchAllCategoriesData = async () => {
    try {
      const fetchedData = await fetchAllCategories();

      if (fetchedData) setData(fetchedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { fetchAllCategoriesData };
};

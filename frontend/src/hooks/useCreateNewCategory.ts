import toast from "react-hot-toast";
import { createNewCategory } from "../services/CreateNewCategoryApi";

type UseCreateAllCategoriesReturn = {
  createNewCategoryData: (title: string, imageUrl: string) => Promise<void>;
};

export const useCreateNewCategory = (): UseCreateAllCategoriesReturn => {
  const createNewCategoryData = async (title: string, imageUrl: string) => {
    try {
      await createNewCategory({ title, imageUrl });

      toast.success("New category added!");
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { createNewCategoryData };
};

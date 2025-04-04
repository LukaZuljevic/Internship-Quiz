import toast from "react-hot-toast";
import { createNewCategory } from "../services/CreateNewCategory";

type UseCreateAllCategoriesReturn = {
  createNewCategoryData: (title: string, imageUrl: string) => Promise<void>;
};

export const useCreateNewCategory = (): UseCreateAllCategoriesReturn => {
  const createNewCategoryData = async (title: string, imageUrl: string) => {
    try {
      const newCategory = await createNewCategory({ title, imageUrl });

      toast.success("New category added!");

      return newCategory;
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { createNewCategoryData };
};

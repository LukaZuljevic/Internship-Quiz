import { api } from "../index";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { CATEGORY_PATH } from "../../constants";
import { CategoryResponseDto } from "../../types/appGlobalTypes";

type CreateCategoryRequest = {
  title: string;
  imageUrl: string;
};

const createCategory = (categoryData: CreateCategoryRequest) => {
  return api.post<CreateCategoryRequest, CategoryResponseDto>(
    CATEGORY_PATH,
    categoryData
  );
};

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("New category added!");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

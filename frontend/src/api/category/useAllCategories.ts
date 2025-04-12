import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { CATEGORY_PATH } from "../../constants";
import { CategoryResponseDto } from "../../types/appGlobalTypes";

const fetchAllCategories = () => {
  return api.get<never, CategoryResponseDto[]>(CATEGORY_PATH);
};

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });
};

import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { QUIZ_API_PATH } from "../../constants";
import { QuizResponseDto } from "../../types/appGlobalTypes";

const fetchQuizzesBySearch = (search: string = "") => {
  const url = search ? `${QUIZ_API_PATH}/search/${search}` : QUIZ_API_PATH;
  return api.get<never, QuizResponseDto[]>(url);
};

export const useSearchQuizzes = (search: string) => {
  return useQuery({
    queryKey: ["quizzes", search],
    queryFn: () => fetchQuizzesBySearch(search),
  });
};

import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { QUESTIONS_PATH } from "../../constants";
import { QuestionResponseDto } from "../../types/appGlobalTypes";

const fetchAllQuestions = () => {
  return api.get<never, QuestionResponseDto[]>(QUESTIONS_PATH);
};

export const useAllQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: fetchAllQuestions,
  });
};

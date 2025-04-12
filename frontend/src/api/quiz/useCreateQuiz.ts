import { api } from "../index";
import { useMutation } from "@tanstack/react-query";
import { QUIZ_API_PATH } from "../../constants";
import { CreateQuizResponseDto } from "../../types/appGlobalTypes";
import { NewQuizRequest } from "../../types/NewQuizRequest";

const createNewQuiz = (quizData: NewQuizRequest) => {
  return api.post<NewQuizRequest, CreateQuizResponseDto>(
    QUIZ_API_PATH,
    quizData
  );
};

export const useCreateQuiz = () => {
  return useMutation({
    mutationKey: ["createQuiz"],
    mutationFn: createNewQuiz,
  });
};

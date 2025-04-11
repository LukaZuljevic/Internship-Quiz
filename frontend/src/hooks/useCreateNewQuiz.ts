import { CreateQuizResponseDto } from "../types/appGlobalTypes";
import { createNewQuiz } from "../services/CreateNewQuizApi";
import { NewQuizRequest } from "../types/NewQuizRequest";

type UseCreateNewQuizReturn = {
  createNewQuizData: ({
    title,
    categoryId,
  }: NewQuizRequest) => Promise<CreateQuizResponseDto | undefined>;
};

export const useCreateNewQuiz = (): UseCreateNewQuizReturn => {
  const createNewQuizData = async ({ title, categoryId }: NewQuizRequest) => {
    try {
      const newQuiz = await createNewQuiz({ title, categoryId });
      return newQuiz;
    } catch (error) {
      console.log(`${error}`);
      return undefined;
    }
  };

  return { createNewQuizData };
};

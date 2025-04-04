import { createNewQuiz } from "../services/CreateNewQuizApi";
import { NewQuizRequest } from "../types/NewQuizRequest";
import { Quiz } from "../types/Quiz";

type UseCreateNewQuizReturn = {
  createNewQuizData: ({
    title,
    categoryId,
  }: NewQuizRequest) => Promise<Quiz | undefined>;
};

export const useCreateNewQuiz = (): UseCreateNewQuizReturn => {
  const createNewQuizData = async ({ title, categoryId }: NewQuizRequest) => {
    try {
      const newQuiz = await createNewQuiz({ title, categoryId });

      return newQuiz;
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return { createNewQuizData };
};

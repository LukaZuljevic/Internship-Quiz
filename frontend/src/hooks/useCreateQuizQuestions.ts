import toast from "react-hot-toast";
import { createQuizQuestions } from "../services/NewQuizQuestionsApi";
import { Question } from "../types/Question";

type UseCreateQuizQuestionsReturn = {
  createQuizQuestionsData: (
    quizId: string,
    questions: Question[]
  ) => Promise<any[] | undefined>;
};

export const useCreateQuizQuestions = (): UseCreateQuizQuestionsReturn => {
  const createQuizQuestionsData = async (
    quizId: string,
    questions: Question[]
  ) => {
    try {
      const questionIds = questions.map((question) => question.id);

      const results = await createQuizQuestions(quizId, questionIds);

      return results;
    } catch (error) {
      console.log(`${error}`);
      toast.error("Failed to add questions to quiz");
    }
  };

  return { createQuizQuestionsData };
};

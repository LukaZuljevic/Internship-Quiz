import { QuizAttempt } from "../types/QuizAttempt";
import { postQuizAttempt } from "../services/CreateQuizAttempt";

type UseCreateUserQuizAttemptReturn = {
  postUserQuizAttemptData: ({
    request,
  }: PostUserQuizAttemptProps) => Promise<void>;
};

type PostUserQuizAttemptProps = {
  request: QuizAttempt;
};

export const useCreateUserQuizAttempt = (): UseCreateUserQuizAttemptReturn => {
  const postUserQuizAttemptData = async ({
    request,
  }: PostUserQuizAttemptProps) => {
    try {
      console.log(request);
      const createQuizAttempt = await postQuizAttempt(request);

      return createQuizAttempt;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "posting wuiz attempt failed. Try again.";
      console.log(errorMessage);
      throw error;
    }
  };

  return { postUserQuizAttemptData };
};

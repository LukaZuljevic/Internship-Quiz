import { QuizAttempt } from "../types/QuizAttempt";
import { postQuizAttempt } from "../services/CreateQuizAttemptApi";
import toast from "react-hot-toast";
import { UserQuizAttemptAnswersResponseDto } from "../types/appGlobalTypes";

type UseCreateUserQuizAttemptReturn = {
  postUserQuizAttemptData: ({
    request,
  }: PostUserQuizAttemptProps) => Promise<UserQuizAttemptAnswersResponseDto>;
};

type PostUserQuizAttemptProps = {
  request: QuizAttempt;
};

export const useCreateUserQuizAttempt = (): UseCreateUserQuizAttemptReturn => {
  const postUserQuizAttemptData = async ({
    request,
  }: PostUserQuizAttemptProps) => {
    try {
      const createQuizAttempt = await postQuizAttempt(request);

      return createQuizAttempt;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "posting wuiz attempt failed. Try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  return { postUserQuizAttemptData };
};

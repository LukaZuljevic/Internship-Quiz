import { CorrectAnswer } from "./question";

export type CreateUserQuizAttemptResponseDto = {
  quiz: {
    id: string;
  };

  user: {
    id: string;
  };

  answers: CorrectAnswer;
  points: number;
};

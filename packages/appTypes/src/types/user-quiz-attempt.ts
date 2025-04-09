import { Answer } from "../../../../frontend/src/types/Answer";

export type UserQuizAttemptDto = {
  quiz: {
    id: string;
  };
  user: {
    id: string;
  };
  answers: Record<string, Answer>;
  points: number;
};

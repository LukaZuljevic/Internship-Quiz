import { Answer } from "./Answer";

export type QuizAttempt = {
  quizId: string;
  userId: string;
  answers: Record<string, Answer>;
  points: number;
};

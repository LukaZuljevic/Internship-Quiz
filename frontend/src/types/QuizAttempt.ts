import { Answer } from "./Answer";

export type QuizAttempt = {
  quizId: string;
  userId: string;
  answers: Record<string, Answer>;
  points: number;
};

export type QuizBasicAttemptInfo = {
  quizId: string;
  userId: string;
  points: number;
};

export type QuizAttemptAnswers = {
  quizId: string;
  userId: string;
  points: number;
  answers: Record<string, Answer>;
};

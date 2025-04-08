import {
  QuestionType,
  Options,
  CorrectAnswer,
} from "@internship-quiz/app-types";

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  categoryId: string;
  options?: Options;
  correctAnswer: CorrectAnswer;
};

export type QuizQuestion = {
  id: string;
  quizId: string;
  questionId: string;
  question: Question;
};

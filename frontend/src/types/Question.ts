import {
  QuestionType,
  Options,
  CorrectAnswer,
} from "./appGlobalTypes/question";

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  category: {
    title: string;
  };
  options?: Options;
  correctAnswer: CorrectAnswer;
};

export type QuizQuestion = {
  id: string;
  quizId: string;
  questionId: string;
  question: Question;
};

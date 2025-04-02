export type QuestionType = "Select" | "Match" | "Field" | "Order" | "Number";

export type CorrectAnswer =
  | { value: string | number }
  | Record<string, string>
  | { order: string[] };

export type Options =
  | string[]
  | { firstArray: string[]; secondArray: string[] }
  | { array: string[] };

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

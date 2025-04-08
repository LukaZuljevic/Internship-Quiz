export type QuestionType = "Select" | "Match" | "Field" | "Order" | "Number";

export type CorrectAnswer =
  | { value: string | number }
  | Record<string, string>
  | { order: string[] };

export type Options =
  | string[]
  | { firstArray: string[]; secondArray: string[] };

export type QuizQuestionDto = {
  id: string;
  title: string;
  type: QuestionType;
  category: {
    title: string;
  };
  options?: Options;
  correctAnswer: CorrectAnswer;
};

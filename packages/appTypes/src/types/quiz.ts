import { QuizQuestionDto } from "./question";

export type CreateQuizResponseDto = {
  id: string;
  title: string;
};

export type QuizResponseDto = {
  id: string;
  title: string;
  category: {
    id: string;
    title: string;
    imageUrl: string | null;
  };
};

export type QuizWithQuestionsResponseDto = {
  id: string;
  title: string;
  category: {
    title: string;
    imageUrl: string | null;
  };
  quizQuestions: {
    question: QuizQuestionDto[];
  };
};

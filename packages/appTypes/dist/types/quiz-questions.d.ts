import { QuestionResponseDto } from "./question";
export type CreateQuizQuestionsResponseDto = {
    quiz: {
        id: string;
    };
    question: {
        id: string;
    };
};
export type QuizQuestionsResponseDto = {
    id: string;
    quizId: string;
    questionId: string;
    question: QuestionResponseDto;
};

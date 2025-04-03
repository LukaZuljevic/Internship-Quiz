import {
  Question,
  QuestionType,
  QuizQuestion as QuizQuestionType,
} from "../../types/Question";
import c from "./QuizSolver.module.css";
import { QuizQuestion } from "../QuizQuestion";
import { useState } from "react";

type QuizSolverProps = {
  quizQuestions: QuizQuestionType[];
};

export const QuizSolver = ({ quizQuestions }: QuizSolverProps) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<Record<string, boolean>>({});

  const correctAnswers = quizQuestions.map((question: QuizQuestionType) => {
    return {
      questionId: question.question.id,
      correctAnswer: question.question.correctAnswer
        ? typeof question.question.correctAnswer === "string"
          ? JSON.parse(question.question.correctAnswer)
          : question.question.correctAnswer
        : null,
    };
  });

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitClick = () => {
    const newResults: Record<string, boolean> = {};

    quizQuestions.map((question: QuizQuestionType) => {
      const currentCorrectAnswer = correctAnswers.find(
        (answer) => answer.questionId === question.questionId
      );

      newResults[question.questionId] = checkAnswer(
        currentCorrectAnswer,
        answers[question.questionId],
        question.question.type
      );
    });

    setResult(newResults);
  };

  const checkAnswer = (answer: any, userAnswer: any, type: QuestionType) => {
    switch (type) {
      case "Field":
      case "Select":
        return (
          answer.correctAnswer.value.toLowerCase() ===
          userAnswer.toLowerCase().trim()
        );
      case "Number":
        return parseInt(answer.correctAnswer.value) === parseInt(userAnswer);
      case "Match":
        for (const key in answer.correctAnswer) {
          if (answer.correctAnswer[key] != userAnswer[key]) {
            return false;
          }
        }
        return true;
      case "Order":
        return (
          JSON.stringify(userAnswer) === JSON.stringify(answer.correctAnswer)
        );
      default:
        return false;
    }
  };

  return (
    <div className={c.quizSolverContainer}>
      {quizQuestions.map((quizQuestion: QuizQuestionType) => (
        <div key={quizQuestion.id}>
          <QuizQuestion
            question={quizQuestion.question}
            onAnswerChange={(answer) =>
              handleAnswerChange(quizQuestion.questionId, answer)
            }
            currentAnswer={answers[quizQuestion.id]}
            isCorrect={result[quizQuestion.questionId]}
          />
        </div>
      ))}

      <button onClick={handleSubmitClick} className={c.submitButton}>
        Submit Quiz
      </button>
    </div>
  );
};

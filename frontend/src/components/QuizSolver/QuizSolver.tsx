import {
  QuestionType,
  QuizQuestion as QuizQuestionType,
} from "../../types/Question";
import c from "./QuizSolver.module.css";
import { QuizQuestion } from "../QuizQuestion";
import { useContext, useEffect, useState } from "react";
import { Answer } from "../../types/Answer";
import { useCreateUserQuizAttempt } from "../../hooks/useCreateUserQuizAttempt";
import { QuizAttempt } from "../../types/QuizAttempt";
import { UserContext } from "../../contexts/UserContext";

type QuizSolverProps = {
  quizQuestions: QuizQuestionType[];
};

export const QuizSolver = ({ quizQuestions }: QuizSolverProps) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [result, setResult] = useState<Record<string, boolean>>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  const { userId } = useContext(UserContext);
  const { postUserQuizAttemptData } = useCreateUserQuizAttempt();

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

  const handleAnswerChange = (questionId: string, answer: Answer) => {
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
    setIsSubmitDisabled(true);
  };

  useEffect(() => {
    let calculatedScore = 0;
    for (const key in result) {
      if (result[key]) calculatedScore++;
    }

    const quizAttempRequest: QuizAttempt = {
      quizId: quizQuestions[0].quizId,
      userId: userId,
      answers: answers,
      points: calculatedScore,
    };

    postUserQuizAttemptData({ request: quizAttempRequest });
  }, [result]);

  const checkAnswer = (answer: any, userAnswer: Answer, type: QuestionType) => {
    switch (type) {
      case "Field":
      case "Select":
        return (
          typeof userAnswer === "string" &&
          answer.correctAnswer.value.toLowerCase() ===
            userAnswer.toLowerCase().trim()
        );

      case "Number":
        return (
          typeof userAnswer === "string" &&
          parseInt(answer.correctAnswer.value) === parseInt(userAnswer)
        );

      case "Match":
        if (typeof userAnswer !== "object" || Array.isArray(userAnswer))
          return false;

        for (const key in answer.correctAnswer) {
          if (answer.correctAnswer[key] !== userAnswer[key]) {
            return false;
          }
        }
        return true;

      case "Order":
        return (
          Array.isArray(userAnswer) &&
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
            onAnswerChange={(answer: Answer) =>
              handleAnswerChange(quizQuestion.questionId, answer)
            }
            currentAnswer={answers[quizQuestion.id]}
            isCorrect={result[quizQuestion.questionId]}
          />
        </div>
      ))}

      <button
        onClick={handleSubmitClick}
        className={c.submitButton}
        disabled={isSubmitDisabled}
      >
        Submit Quiz
      </button>
    </div>
  );
};

import { QuizQuestion as QuizQuestionType } from "../../types/Question";
import c from "./QuizSolver.module.css";
import { QuizQuestion } from "../QuizQuestion";
import { useContext, useEffect, useState } from "react";
import { Answer } from "../../types/Answer";
import { QuizAttempt, QuizBasicAttemptInfo } from "../../types/QuizAttempt";
import { UserContext } from "../../contexts/UserContext";
import { QuestionType } from "../../types/appGlobalTypes";
import { useQuizAttempt } from "../../api/quiz-attempt/useQuizAttempt";

type QuizSolverProps = {
  quizQuestions: QuizQuestionType[];
  solvedQuizData?: QuizBasicAttemptInfo;
  createQuizAttempt: (quizAttempt: QuizAttempt) => void;
  isTimerExpired: boolean;
};

export const QuizSolver = ({
  quizQuestions,
  solvedQuizData,
  createQuizAttempt,
  isTimerExpired,
}: QuizSolverProps) => {
  const { userId } = useContext(UserContext);

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [result, setResult] = useState<Record<string, boolean>>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  const { data: previousAnswers } = useQuizAttempt(
    userId,
    solvedQuizData?.quizId || ""
  );
  useEffect(() => {
    if (isTimerExpired) {
      handleSubmitClick();
    }
  }, [isTimerExpired]);

  useEffect(() => {
    if (previousAnswers) {
      setAnswers(previousAnswers.answers);

      const newResults = evaluateAnswers(previousAnswers.answers);
      setResult(newResults);

      setIsSubmitDisabled(true);
    }
  }, [previousAnswers]);

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

  const evaluateAnswers = (
    userAnswers: Record<string, Answer>
  ): Record<string, boolean> => {
    const newResults: Record<string, boolean> = {};

    quizQuestions.forEach((question: QuizQuestionType) => {
      const currentCorrectAnswer = correctAnswers.find(
        (answer) => answer.questionId === question.questionId
      );

      newResults[question.questionId] = checkAnswer(
        currentCorrectAnswer,
        userAnswers[question.questionId],
        question.question.type
      );
    });

    return newResults;
  };

  const handleSubmitClick = () => {
    if (isSubmitDisabled) return;

    const newResults = evaluateAnswers(answers);

    let calculatedScore = 0;
    for (const key in newResults) {
      if (newResults[key]) calculatedScore++;
    }

    const quizAttemptRequest: QuizAttempt = {
      quizId: quizQuestions[0].quizId,
      userId: userId,
      answers: answers,
      points: calculatedScore,
    };

    createQuizAttempt(quizAttemptRequest);

    setResult(newResults);
    setIsSubmitDisabled(true);
  };

  const checkAnswer = (answer: any, userAnswer: Answer, type: QuestionType) => {
    if (!userAnswer) return false;

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
        <div key={quizQuestion.questionId}>
          <QuizQuestion
            question={quizQuestion.question}
            onAnswerChange={(answer: Answer) =>
              handleAnswerChange(quizQuestion.questionId, answer)
            }
            currentAnswer={answers[quizQuestion.questionId]}
            isCorrect={result[quizQuestion.questionId]}
          />
        </div>
      ))}

      <button
        onClick={handleSubmitClick}
        className={c.submitButton}
        disabled={isSubmitDisabled}
      >
        {isSubmitDisabled ? "Quiz submitted" : "Submit quiz"}
      </button>
    </div>
  );
};

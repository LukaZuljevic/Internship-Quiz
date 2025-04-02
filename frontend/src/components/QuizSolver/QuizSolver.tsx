import {
  Question,
  QuizQuestion as QuizQuestionType,
} from "../../types/Question";
import styles from "./QuizSolver.module.css";
import { QuizQuestion } from "../QuizQuestion";
import { useState } from "react";

type QuizSolverProps = {
  quizQuestions: QuizQuestionType[];
};

export const QuizSolver = ({ quizQuestions }: QuizSolverProps) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return (
    <div className={styles.quizSolverContainer}>
      {quizQuestions.map((quizQuestion: QuizQuestionType) => (
        <div key={quizQuestion.id} className={styles.questionWrapper}>
          <QuizQuestion
            question={quizQuestion.question}
            onAnswerChange={(answer) =>
              handleAnswerChange(quizQuestion.id, answer)
            }
          />
        </div>
      ))}
    </div>
  );
};

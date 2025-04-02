import {
  Question,
  QuizQuestion as QuizQuestionType,
} from "../../types/Question";
import styles from "./QuizSolver.module.css";
import { QuizQuestion } from "../QuizQuestion";

type QuizSolverProps = {
  quizQuestions: QuizQuestionType[];
};

export const QuizSolver = ({ quizQuestions }: QuizSolverProps) => {
  return (
    <div className={styles.quizSolverContainer}>
      {quizQuestions.map((quizQuestion: QuizQuestionType) => (
        <div key={quizQuestion.id} className={styles.questionWrapper}>
          <QuizQuestion question={quizQuestion.question} />
        </div>
      ))}
    </div>
  );
};

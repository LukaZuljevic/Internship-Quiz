import { Quiz } from "../../types/Quiz";
import { QuizBasicAttemptInfo } from "../../types/QuizAttempt";
import { QuizCard } from "../QuizCard";
import c from "./QuizList.module.css";

type QuizListProps = {
  quizzes: Quiz[];
  solvedQuizzes?: QuizBasicAttemptInfo[];
};

export const QuizList = ({ quizzes, solvedQuizzes }: QuizListProps) => {
  return (
    <ul className={c.quizList}>
      {quizzes.map((quiz: Quiz) => {
        const solvedQuiz = solvedQuizzes?.find(
          (solved) => solved.quizId === quiz.id
        );

        const achievedPoints = solvedQuiz?.points;

        return (
          <QuizCard
            key={quiz.id}
            quizInfo={quiz}
            solvedQuiz={solvedQuiz}
            achievedPoints={achievedPoints}
          />
        );
      })}
    </ul>
  );
};

import { Quiz } from "../../types/Quiz";
import { QuizCard } from "../QuizCard";
import c from "./QuizList.module.css";

type QuizListProps = {
  quizzes: Quiz[];
};

export const QuizList = ({ quizzes }: QuizListProps) => {
  return (
    <ul className={c.quizList}>
      {quizzes.map((quiz) => (
        <QuizCard quizInfo={quiz} />
      ))}
    </ul>
  );
};

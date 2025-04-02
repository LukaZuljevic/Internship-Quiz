import { Quiz } from "../../types/Quiz";
import c from "./QuizCard.module.css";

type QuizCardProps = {
  quizInfo: Quiz;
};

export const QuizCard = ({ quizInfo }: QuizCardProps) => {
  return (
    <li key={quizInfo.id} className={c.quizCard}>
      <img src={quizInfo.category.imageUrl} className={c.quizCardImage} />
      <h3 className={c.quizCardTitle}> {quizInfo.title}</h3>
      <p className={c.quizCardCategory}>
        <span className={c.categoryText}>Category:</span>{" "}
        {quizInfo.category.title}
      </p>
    </li>
  );
};

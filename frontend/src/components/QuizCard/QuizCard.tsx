import { Quiz } from "../../types/Quiz";
import c from "./QuizCard.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

type QuizCardProps = {
  quizInfo: Quiz;
};

export const QuizCard = ({ quizInfo }: QuizCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(ROUTES.QUIZ_PAGE.replace(":quizId", quizInfo.id));
  };
  return (
    <li key={quizInfo.id} className={c.quizCard} onClick={handleCardClick}>
      <img src={quizInfo.category.imageUrl} className={c.quizCardImage} />
      <h3 className={c.quizCardTitle}> {quizInfo.title}</h3>
      <p className={c.quizCardCategory}>
        <span className={c.categoryText}>Category:</span>{" "}
        {quizInfo.category.title}
      </p>
    </li>
  );
};

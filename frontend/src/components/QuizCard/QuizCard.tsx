import { Quiz } from "../../types/Quiz";
import { QuizBasicAttemptInfo } from "../../types/QuizAttempt";
import c from "./QuizCard.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

type QuizCardProps = {
  quizInfo: Quiz;
  solvedQuiz?: QuizBasicAttemptInfo;
  achievedPoints?: number;
};

export const QuizCard = ({
  quizInfo,
  solvedQuiz,
  achievedPoints,
}: QuizCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(ROUTES.QUIZ_PAGE.replace(":quizId", quizInfo.id));
  };

  return (
    <li
      className={`${c.quizCard} ${solvedQuiz ? c.solvedQuizCard : ""}`}
      onClick={handleCardClick}
    >
      <img
        src={quizInfo.category.imageUrl ?? ""}
        className={c.quizCardImage}
        alt={quizInfo.category.title}
      />
      <h3 className={c.quizCardTitle}>{quizInfo.title}</h3>
      <p className={c.quizCardCategory}>
        <span className={c.categoryText}>Category:</span>
        {quizInfo.category.title}
      </p>
      {solvedQuiz && (
        <div className={c.quizCardPoints}>
          <span className={c.pointsText}>Points achieved:</span>
          {achievedPoints}
        </div>
      )}
    </li>
  );
};

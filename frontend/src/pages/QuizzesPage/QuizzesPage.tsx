import c from "./QuizzesPage.module.css";
import { useSearchQuizzes } from "../../api/quiz/useSearchQuizzes";
import { useState, useContext, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { QuizList } from "../../components/QuizList";
import { CategoryFilter } from "../../components/CategoryFilter";
import { useUserPointsByEmail } from "../../api/user/useUserPointsByEmail";
import { AddNewCategory } from "../../components/AddNewCategory";
import { PointsLeaderboard } from "../../components/PointsLeadeboard";
import { ROUTES } from "../../router/routes";
import { UserContext } from "../../contexts/UserContext";
import { useAllSolvedQuizzes } from "../../api/quiz-attempt/useAllSolvedQuizzes";
import { Quiz } from "../../types/Quiz";

export const QuizzesPage = () => {
  const { email, role, userId } = useContext(UserContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: quizzes = [] } = useSearchQuizzes(search);
  const { data: userPoints } = useUserPointsByEmail(email);
  const { data: solvedQuizzes = [] } = useAllSolvedQuizzes(userId);

  const [currentCategory, setCurrentCategory] = useState<string>("");

  const filteredQuizzes: Quiz[] = useMemo(() => {
    return currentCategory
      ? quizzes.filter((quiz) => quiz.category.title === currentCategory)
      : quizzes;
  }, [currentCategory, quizzes]);

  return (
    <div id={c.quizzesPage}>
      <div className={c.filterAndPoints}>
        {role === "Admin" && (
          <div className={c.adminButtons}>
            <button
              className={c.createQuizButton}
              onClick={() => navigate(ROUTES.CREATE_QUIZ_PAGE)}
            >
              Create a quiz
            </button>
            <PointsLeaderboard />
            <AddNewCategory />
          </div>
        )}
        <CategoryFilter
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <h3>TOTAL POINTS: {userPoints?.totalPoints}</h3>
      </div>

      {filteredQuizzes.length > 0 ? (
        <QuizList quizzes={filteredQuizzes} solvedQuizzes={solvedQuizzes} />
      ) : (
        <p className={c.noQuizFound}>
          No quizzes found. Search something different!
        </p>
      )}
    </div>
  );
};

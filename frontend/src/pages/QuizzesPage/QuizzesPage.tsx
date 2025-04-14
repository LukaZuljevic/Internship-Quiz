import c from "./QuizzesPage.module.css";
import { useSearchQuizzes } from "../../api/quiz/useSearchQuizzes";
import { useState, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { QuizList } from "../../components/QuizList";
import { useUserPointsByEmail } from "../../api/user/useUserPointsByEmail";
import { UserContext } from "../../contexts/UserContext";
import { useAllSolvedQuizzes } from "../../api/quiz-attempt/useAllSolvedQuizzes";
import { Quiz } from "../../types/Quiz";
import { Dashboard } from "../../components/Dashboard";
import { CategoryFilter } from "../../components/CategoryFilter";
import { Role } from "../../types/Roles";

export const QuizzesPage = () => {
  const { email, role, userId } = useContext(UserContext);

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
      {role === Role.ADMIN && <Dashboard />}

      <div className={c.pointsAndFilter}>
        <h1 className={c.totalPoints}>
          YOUR POINTS: {userPoints?.totalPoints}
        </h1>
        <CategoryFilter
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
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

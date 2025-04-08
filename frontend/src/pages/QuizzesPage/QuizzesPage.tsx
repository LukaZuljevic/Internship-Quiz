import c from "./QuizzesPage.module.css";
import { useFetchQuizzesBySearch } from "../../hooks/useFetchQuizzesBySearch";
import { useState, useEffect, useContext } from "react";
import { Quiz } from "../../types/Quiz";
import { useSearchParams, useNavigate } from "react-router-dom";
import { QuizList } from "../../components/QuizList";
import { CategoryFilter } from "../../components/CategoryFilter";
import { useFetchUserPoints } from "../../hooks/useFetchUserPoints";
import { AddNewCategory } from "../../components/AddNewCategory";
import { PointsLeaderboard } from "../../components/PointsLeadeboard";
import { ROUTES } from "../../router/routes";
import { UserContext } from "../../contexts/UserContext";

export const QuizzesPage = () => {
  const { email, role } = useContext(UserContext);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { fetchQuizzesBySearchData } = useFetchQuizzesBySearch({
    setData: setQuizzes,
    search,
  });

  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);

  const [totalPoints, setTotalPoints] = useState<number>();
  const { fetchUserPointsData } = useFetchUserPoints(setTotalPoints, email);

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuizzesBySearchData(search);
      await fetchUserPointsData();
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    setFilteredQuizzes(
      currentCategory
        ? quizzes.filter((quiz) => quiz.category.title === currentCategory)
        : quizzes
    );
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
        <h3>TOTAL POINTS: {totalPoints}</h3>
      </div>

      {filteredQuizzes.length > 0 ? (
        <QuizList quizzes={filteredQuizzes} />
      ) : (
        <p className={c.noQuizFound}>
          No quizzes found. Search something different!
        </p>
      )}
    </div>
  );
};

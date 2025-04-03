import c from "./QuizzesPage.module.css";
import { useFetchQuizzesBySearch } from "../../hooks/useFetchQuizzesBySearch";
import { useState, useEffect } from "react";
import { Quiz } from "../../types/Quiz";
import { useSearchParams } from "react-router-dom";
import { QuizList } from "../../components/QuizList";
import { CategoryFilter } from "../../components/CategoryFilter";
import { useFetchUserPoints } from "../../hooks/useFetchUserPoints";
import { getDataFromToken } from "../../utils/getUserDataFromJwt";
import { AddNewCategory } from "../../components/AddNewCategory";

export const QuizzesPage = () => {
  const role = getDataFromToken("role");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { fetchQuizzesBySearchData } = useFetchQuizzesBySearch({
    setData: setQuizzes,
    search,
  });

  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);

  const [totalPoints, setTotalPoints] = useState<number>();
  const { fetchUserPointsData } = useFetchUserPoints(setTotalPoints);

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
        ? quizzes.filter((quiz) =>
            quiz.category.title.includes(currentCategory)
          )
        : quizzes
    );
  }, [currentCategory, quizzes]);

  return (
    <div id={c.quizzesPage}>
      <div className={c.filterAndPoints}>
        {role === "Admin" && <AddNewCategory />}
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

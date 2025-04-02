import c from "./QuizzesPage.module.css";
import { useFetchQuizzesBySearch } from "../../hooks/useFetchQuizzesBySearch";
import { useState, useEffect } from "react";
import { Quiz } from "../../types/Quiz";
import { useSearchParams } from "react-router-dom";
import { QuizList } from "../../components/QuizList";
import { useFetchAllCategories } from "../../hooks/useFetchAllCategories";
import { Category } from "../../types/Category";

export const QuizzesPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { fetchQuizzesBySearchData } = useFetchQuizzesBySearch({
    setData: setQuizzes,
    search,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const { fetchAllCategoriesData } = useFetchAllCategories(setCategories);

  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuizzesBySearchData(search);
      await fetchAllCategoriesData();
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
    <div>
      <select
        value={currentCategory}
        onChange={(e) => setCurrentCategory(e.target.value)}
      >
        <option value="">Any category</option>
        {categories.map((category: Category) => (
          <option key={category.imageUrl} value={category.title}>
            {category.title}
          </option>
        ))}
      </select>

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

import c from "./QuizzesPage.module.css";
import { useFetchQuizzesBySearch } from "../../hooks/useFetchQuizzesBySearch";
import { useState, useEffect } from "react";
import { Quiz } from "../../types/Quiz";
import { useSearchParams } from "react-router-dom";
import { QuizList } from "../../components/QuizList";

export const QuizzesPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { fetchQuizzesBySearchData } = useFetchQuizzesBySearch({
    setData: setQuizzes,
    search,
  });

  useEffect(() => {
    fetchQuizzesBySearchData(search);
  }, [search]);

  return (
    <div>
      {quizzes.length > 0 ? (
        <QuizList quizzes={quizzes} />
      ) : (
        <p className={c.noQuizFound}>
          No quizzes found. Search something different!
        </p>
      )}
    </div>
  );
};

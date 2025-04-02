import c from "./QuizzesPage.module.css";
import { useFetchQuizzesBySearch } from "../../hooks/useFetchQuizzesBySearch";
import { useState, useEffect } from "react";
import { Quiz } from "../../types/Quiz";
import { useSearchParams } from "react-router-dom";

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
      <h1>Quizzes Page</h1>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>{quiz.title}</li>
          ))}
        </ul>
      ) : (
        <p>No quizzes found.</p>
      )}
    </div>
  );
};

import c from "./QuizPage.module.css";
import { useParams } from "react-router-dom";
import { useFetchQuizQuestions } from "../../hooks/useFetchQuizQuestions";
import { useEffect, useState } from "react";
import { Question, QuizQuestion } from "../../types/Question";
import { QuizSolver } from "../../components/QuizSolver";

export const QuizPage = () => {
  const { quizId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const { fetchQuizQuestionsData } = useFetchQuizQuestions({
    setData: (data) => {
      setQuizQuestions(data);
      setIsLoading(false);
    },
    quizId: quizId || "",
  });

  useEffect(() => {
    if (quizId) {
      setIsLoading(true);
      fetchQuizQuestionsData(quizId);
    }
  }, [quizId]);

  if (!quizId) return <h1>No quiz Id</h1>;
  if (isLoading) return <h1>Loading quiz...</h1>;

  return (
    <div className={c.quizPageContainer}>
      <QuizSolver quizQuestions={quizQuestions} />
    </div>
  );
};

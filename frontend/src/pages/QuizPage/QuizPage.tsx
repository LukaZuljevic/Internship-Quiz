import { useLocation, useParams } from "react-router-dom";
import { useFetchQuizQuestions } from "../../hooks/useFetchQuizQuestions";
import { useEffect, useState } from "react";
import { QuizQuestion } from "../../types/Question";
import { QuizSolver } from "../../components/QuizSolver";
import { NotFoundPage } from "../NotFoundPage";
import { QuizBasicAttemptInfo } from "../../types/QuizAttempt";

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const solvedQuizData: QuizBasicAttemptInfo | undefined = location.state;

  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  if (quizQuestions.length < 1) return <NotFoundPage />;

  if (isLoading) return <h1>Loading quiz...</h1>;

  return (
    <QuizSolver quizQuestions={quizQuestions} solvedQuizData={solvedQuizData} />
  );
};

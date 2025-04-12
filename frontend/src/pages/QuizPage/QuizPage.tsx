import { useLocation, useParams } from "react-router-dom";
import { useQuizQuestions } from "../../api/quiz-questions/useQuizQuestions";
import { QuizSolver } from "../../components/QuizSolver";
import { NotFoundPage } from "../NotFoundPage";
import { QuizBasicAttemptInfo } from "../../types/QuizAttempt";
import c from "./QuizPage.module.css";

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const solvedQuizData: QuizBasicAttemptInfo | undefined = location.state;

  const { data: quizQuestions, isLoading } = useQuizQuestions(quizId);

  if (isLoading) return <h1>Loading quiz...</h1>;
  if (!quizQuestions || quizQuestions.length < 1) return <NotFoundPage />;

  return (
    <div className={c.quizPage}>
      <QuizSolver
        quizQuestions={quizQuestions}
        solvedQuizData={solvedQuizData}
      />
    </div>
  );
};

import { useLocation, useParams } from "react-router-dom";
import { useQuizQuestions } from "../../api/quiz-questions/useQuizQuestions";
import { QuizSolver } from "../../components/QuizSolver";
import { NotFoundPage } from "../NotFoundPage";
import { QuizBasicAttemptInfo } from "../../types/QuizAttempt";
import c from "./QuizPage.module.css";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Timer } from "../../components/Timer";
import { useCreateQuizAttempt } from "../../api/quiz-attempt/useCreateQuizAttempt";
import { useState } from "react";

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();

  const location = useLocation();
  const solvedQuizData: QuizBasicAttemptInfo | undefined = location.state;

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);

  const { data: quizQuestions, isLoading } = useQuizQuestions(quizId);
  const { mutate: createQuizAttempt } = useCreateQuizAttempt();

  if (isLoading) return <LoadingSpinner />;
  if (!quizQuestions || quizQuestions.length < 1) return <NotFoundPage />;

  return (
    <div className={c.quizPage}>
      {solvedQuizData === null ? (
        <Timer expiryTimestamp={time} setIsTimerExpired={setIsTimerExpired} />
      ) : null}
      <QuizSolver
        quizQuestions={quizQuestions}
        solvedQuizData={solvedQuizData}
        createQuizAttempt={createQuizAttempt}
        isTimerExpired={isTimerExpired}
      />
    </div>
  );
};

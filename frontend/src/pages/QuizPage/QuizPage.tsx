import { useLocation, useParams } from "react-router-dom";
import { useQuizQuestions } from "../../api/quiz-questions/useQuizQuestions";
import { QuizSolver } from "../../components/QuizSolver";
import { NotFoundPage } from "../NotFoundPage";
import { QuizBasicAttemptInfo } from "../../types/QuizAttempt";
import c from "./QuizPage.module.css";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Timer } from "../../components/Timer";
import { useCreateQuizAttempt } from "../../api/quiz-attempt/useCreateQuizAttempt";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useQuizAttempt } from "../../api/quiz-attempt/useQuizAttempt";

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { userId } = useContext(UserContext);

  const location = useLocation();
  const solvedQuizData: QuizBasicAttemptInfo | undefined = location.state;

  const [isSubmittedFlag, setIsSubmittedFlag] = useState<boolean>(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);

  const { data: previousAttempt, isLoading: isLoadingAttempt } = useQuizAttempt(
    userId,
    quizId || ""
  );
  const { data: quizQuestions, isLoading: isLoadingQuestions } =
    useQuizQuestions(quizId);
  const { mutate: createQuizAttempt } = useCreateQuizAttempt();

  if (isLoadingQuestions || isLoadingAttempt) return <LoadingSpinner />;
  if (!quizQuestions || quizQuestions.length < 1) return <NotFoundPage />;

  const isQuizSubmitted = isSubmittedFlag || !!previousAttempt;

  return (
    <div className={c.quizPage}>
      {!isQuizSubmitted ? (
        <Timer expiryTimestamp={time} setIsTimerExpired={setIsTimerExpired} />
      ) : null}
      <QuizSolver
        quizQuestions={quizQuestions}
        solvedQuizData={solvedQuizData}
        createQuizAttempt={createQuizAttempt}
        isTimerExpired={isTimerExpired}
        setIsSubmittedFlag={setIsSubmittedFlag}
      />
    </div>
  );
};

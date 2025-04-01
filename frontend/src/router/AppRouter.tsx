import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import { QuizzesPage } from "../pages/QuizzesPage";
import { Layout } from "../pages/Layout";
import { QuizPage } from "../pages/QuizPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Toaster } from "react-hot-toast";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.QUIZZES_PAGE} element={<Layout />}>
          <Route index element={<QuizzesPage />} />
          <Route path={ROUTES.QUIZ_PAGE} element={<QuizPage />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

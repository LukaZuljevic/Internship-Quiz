import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "./routes";
import { QuizzesPage } from "../pages/QuizzesPage";
import { Layout } from "../pages/Layout";
import { QuizPage } from "../pages/QuizPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import { RegisterPage } from "../pages/Auth/RegisterPage";
import { LoginPage } from "../pages/Auth/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { CreateQuizPage } from "../pages/CreateQuizPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.QUIZZES_PAGE} />} />
        <Route path={ROUTES.QUIZZES_PAGE} element={<Layout />}>
          <Route index element={<PrivateRoute element={<QuizzesPage />} />} />
          <Route
            path={ROUTES.QUIZ_PAGE}
            element={<PrivateRoute element={<QuizPage />} />}
          />
        </Route>
        <Route
          path={ROUTES.CREATE_QUIZ_PAGE}
          element={<PrivateRoute element={<CreateQuizPage />} />}
        />
        <Route path={ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

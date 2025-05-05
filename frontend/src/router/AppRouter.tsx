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
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export const AppRouter = () => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.QUIZZES_PAGE} replace />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />
        <Route path={ROUTES.QUIZZES_PAGE} element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute element={<QuizzesPage />} hasAdminCheck={false} />
            }
          />
          <Route
            path={ROUTES.QUIZ_PAGE}
            element={
              <PrivateRoute element={<QuizPage />} hasAdminCheck={false} />
            }
          />
        </Route>
        <Route
          path={ROUTES.CREATE_QUIZ_PAGE}
          element={
            <PrivateRoute element={<CreateQuizPage />} hasAdminCheck={true} />
          }
        />
        <Route path={ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

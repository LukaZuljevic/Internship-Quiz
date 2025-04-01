import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import { QuizesPage } from "../pages/QuizesPage";
import { Layout } from "../pages/Layout";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.QUIZESPAGE} element={<Layout />}>
          <Route index element={<QuizesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

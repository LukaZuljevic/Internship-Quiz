import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import { HomePage } from "../pages/HomePage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<HomePage />} />
      </Routes>
    </Router>
  );
};

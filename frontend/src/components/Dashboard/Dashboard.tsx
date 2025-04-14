import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import c from "./Dashboard.module.css";
import { PointsLeaderboard } from "../PointsLeadeboard";
import { AddNewCategory } from "../AddNewCategory";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={c.dashboard}>
      <div className={c.adminButtons}>
        <button
          className={c.createQuizButton}
          onClick={() => navigate(ROUTES.CREATE_QUIZ_PAGE)}
        >
          Create a quiz
        </button>
        <PointsLeaderboard />
        <AddNewCategory />
      </div>
    </div>
  );
};

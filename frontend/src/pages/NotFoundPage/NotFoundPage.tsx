import { Link } from "react-router-dom";
import c from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <div className={c.notFoundContainer}>
      <Link to="/app" className={c.homeButton}>
        Home
      </Link>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import c from "./LogoutButton.module.css";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!confirm("Are you sure you want to logout")) return;

    localStorage.removeItem("jwt");

    navigate(ROUTES.LOGIN);
  };
  return (
    <button onClick={handleButtonClick} className={c.logoutButton}>
      Logout
    </button>
  );
};

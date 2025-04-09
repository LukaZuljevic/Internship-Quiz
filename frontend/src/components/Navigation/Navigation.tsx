import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import c from "./Navigation.module.css";
import { LogoutButton } from "../LogoutButton";

export const Navigation = () => {
  const [search, setSearch] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    const trimmedSearch = search.trim();
    navigate(
      `${ROUTES.QUIZZES_PAGE}?search=${encodeURIComponent(trimmedSearch)}`,
      {
        state: search,
      }
    );
  };

  return (
    <div id={c.navigation}>
      <input
        type="text"
        placeholder="Enter quiz name"
        value={search}
        onChange={(e) => handleInputChange(e)}
        className={c.searchBar}
      />

      <button onClick={handleButtonClick} className={c.searchButton}>
        Search
      </button>
      <LogoutButton />
    </div>
  );
};

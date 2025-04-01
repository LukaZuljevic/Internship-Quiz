import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import c from "./Navigation.module.css";

export const Navigation = () => {
  const [search, setSearch] = useState<String>("");
  const inputRef = useRef<HTMLInputElement>(null);

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

    setSearch("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div id="navigation">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter quiz name"
        onChange={(e) => handleInputChange(e)}
      />
      <button onClick={handleButtonClick}>Search</button>
    </div>
  );
};

import c from "./QuizzesPage.module.css";
import { fetchAllQuizes } from "../../services/AllQuizzesApi";
import { useState } from "react";

export const QuizzesPage = () => {
  const [data, setData] = useState();

  const data1 = fetchAllQuizes();

  console.log(data1);

  return <h1>QuizzesPage</h1>;
};

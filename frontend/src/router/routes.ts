type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  REGISTER: "/register",
  QUIZZES_PAGE: "/",
  QUIZ_PAGE: "/:quizId",
  NOT_FOUND_PAGE: "*",
};

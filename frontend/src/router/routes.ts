type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  QUIZZES_PAGE: "/",
  QUIZ_PAGE: "/:quizId",
  NOT_FOUND_PAGE: "*",
};

type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  REGISTER: "/register",
  LOGIN: "/login",
  QUIZZES_PAGE: "/",
  QUIZ_PAGE: "/:quizId",
  NOT_FOUND_PAGE: "*",
  CREATE_QUIZ_PAGE: "/admin/create-quiz",
};

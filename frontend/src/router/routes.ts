type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  REGISTER: "/register",
  LOGIN: "/login",
  QUIZZES_PAGE: "/app",
  QUIZ_PAGE: "/app/:quizId",
  NOT_FOUND_PAGE: "*",
  CREATE_QUIZ_PAGE: "/app/admin/create-quiz",
};

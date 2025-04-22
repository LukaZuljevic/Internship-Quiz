import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ROUTES } from "./routes";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Role } from "../types/Roles";

interface PrivateRouteProps {
  element: ReactNode;
  hasAdminCheck?: boolean;
}

export const PrivateRoute = ({ element, hasAdminCheck }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, role } = useContext(UserContext);

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  if (hasAdminCheck && role !== Role.ADMIN) {
    return <Navigate to={ROUTES.QUIZZES_PAGE} replace />;
  }

  return <>{element}</>;
};

import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ROUTES } from "./routes";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface PrivateRouteProps {
  element: ReactNode;
}

export const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useContext(UserContext);

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return <>{element}</>;
};

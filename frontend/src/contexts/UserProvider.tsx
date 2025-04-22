import { FC, PropsWithChildren, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getDataFromToken } from "../utils/getUserDataFromJwt";
import { Role } from "../types/Roles";
import { isTokenExpired } from "../utils/isTokenExpired";

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<Role>(Role.USER);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUserState = () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      if (isTokenExpired()) {
        console.log("Token is expired");
        localStorage.removeItem("jwt");
        setIsAuthenticated(false);
      } else {
        try {
          const email = getDataFromToken("email");
          const userId = getDataFromToken("id");
          const role = getDataFromToken("role");

          setIsAuthenticated(true);
          setEmail(email);
          setUserId(userId);
          setRole(role as Role);
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem("jwt");
          setIsAuthenticated(false);
        }
      }
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    refreshUserState();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        email,
        role,
        userId,
        isLoading,
        refreshUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

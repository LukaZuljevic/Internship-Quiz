import { FC, useState, useEffect, PropsWithChildren } from "react";
import { UserContext } from "./UserContext";
import { getDataFromToken } from "../utils/getUserDataFromJwt";
import { Role } from "../types/Roles";

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<Role>(Role.USER);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      try {
        const email = getDataFromToken("email");
        const userId = getDataFromToken("userId");
        const role = getDataFromToken("role");

        console.log(email);

        setIsAuthenticated(true);
        setEmail(email);
        setUserId(userId);
        setRole(role as Role);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("jwt");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{ isAuthenticated, email, role, userId, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

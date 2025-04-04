import { createContext } from "react";
import { Role } from "../types/Roles";

type UserContextType = {
  isAuthenticated: boolean;
  email: string;
  role: Role;
  userId: string;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  email: "",
  role: Role.USER,
  userId: "",
  isLoading: true,
});

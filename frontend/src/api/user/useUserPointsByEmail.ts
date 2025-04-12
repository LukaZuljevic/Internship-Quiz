import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { USER_PATH } from "../../constants";
import { UserPointsResponseDto } from "../../types/appGlobalTypes";

const fetchUserPoints = (email: string) => {
  return api.get<never, UserPointsResponseDto>(`${USER_PATH}/points/${email}`);
};

export const useUserPointsByEmail = (email: string) => {
  return useQuery({
    queryKey: ["userPoints", email],
    queryFn: () => fetchUserPoints(email),
  });
};

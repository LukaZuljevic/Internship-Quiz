import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { USER_PATH } from "../../constants";
import { UserPointsResponseDto } from "../../types/appGlobalTypes";

const fetchAllUserPoints = () => {
  return api.get<never, UserPointsResponseDto[]>(USER_PATH);
};

export const useUserPoints = () => {
  return useQuery({
    queryKey: ["userPoints"],
    queryFn: fetchAllUserPoints,
  });
};

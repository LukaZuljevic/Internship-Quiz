import { fetchUserPoints } from "../services/UserPointsApi";

type UseFetchUserPointsReturn = {
  fetchUserPointsData: () => Promise<void>;
};

export const useFetchUserPoints = (
  setData: (item: number) => void
): UseFetchUserPointsReturn => {
  const fetchUserPointsData = async () => {
    try {
      const userPoints = await fetchUserPoints();

      setData(userPoints.totalPoints);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "fetcing points failed. Try again.";
      console.log(errorMessage);
      throw error;
    }
  };

  return { fetchUserPointsData };
};

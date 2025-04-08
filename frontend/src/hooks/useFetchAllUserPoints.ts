import { fetchAllUserPoints } from "../services/AllUserPointsApi";
import { LeadeboardParticipant } from "../types/LeadeboardParticipant";

type UseFetchAllUserPointsReturn = {
  fetchAllUserPointsData: () => Promise<void>;
};

export const useFetchAllUserPoints = (
  setData: (items: LeadeboardParticipant[]) => void
): UseFetchAllUserPointsReturn => {
  const fetchAllUserPointsData = async () => {
    try {
      const fetchedData = await fetchAllUserPoints();
      if (fetchedData) setData(fetchedData);
    } catch (error) {
      console.log(`Fetch error: ${error}`);
    }
  };

  return { fetchAllUserPointsData };
};

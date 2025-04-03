import { useState, useEffect } from "react";
import { useFetchAllUserPoints } from "../../hooks/useFetchAllUserPoints";
import c from "./PointsLeadeboard.module.css";
import { LeadeboardParticipant } from "../../types/LeadeboardParticipant";

export const PointsLeaderboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<
    LeadeboardParticipant[]
  >([]);

  const { fetchAllUserPointsData } = useFetchAllUserPoints(setLeaderboardData);

  useEffect(() => {
    fetchAllUserPointsData();
  }, [isOpen]);

  return (
    <div className={c.pointsLeaderboardContainer}>
      <button
        className={c.leaderboardButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Show Leaderboard
      </button>

      {isOpen && (
        <div className={c.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={c.leaderboardCard}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Points Leaderboard</h2>
            <ul>
              {leaderboardData.map((user, index) => (
                <li key={user.id}>
                  {index + 1}. {user.firstName.concat(" ", user.lastName)}-
                  {user.totalPoints} pts
                </li>
              ))}
            </ul>
            <button className={c.closeButton} onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

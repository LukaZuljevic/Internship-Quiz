import { useTimer } from "react-timer-hook";
import c from "./Timer.module.css";

type TimerProps = {
  expiryTimestamp: Date;
  setIsTimerExpired: (isExpired: boolean) => void;
};

export const Timer = ({ expiryTimestamp, setIsTimerExpired }: TimerProps) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => setIsTimerExpired(true),
  });

  return (
    <div className={c.timer}>
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

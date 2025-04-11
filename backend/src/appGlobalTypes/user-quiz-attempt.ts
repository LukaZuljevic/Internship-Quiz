export type Answer = string | Record<string, string> | string[];

export type UserQuizBasicAttemptResponseDto = {
  quiz: {
    id: string;
  };
  user: {
    id: string;
  };
  points: number;
};

export type UserQuizAttemptAnswersResponseDto = {
  quiz: {
    id: string;
  };
  user: {
    id: string;
  };
  answers: Record<string, Answer>;
  points: number;
};

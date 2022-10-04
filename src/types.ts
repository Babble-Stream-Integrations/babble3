//type for chat
export type Message = {
  username: string;
  message: string;
  color: string | undefined;
};

//type for streamer info
export type Streamer = {
  name: string;
  id: string;
};

//type for Quiz
export type QuizBackend = {
  question: string;
  possibilities: string[];
  time: number;
  rightAnswer: string;
  percentages: Percentages[];
};

export type Percentages = {
  percentage: number;
};
export type QuizComponentData = {
  question: string;
  answers: string[];
  rightAnswer: string;
  percentages: Percentages[];
};

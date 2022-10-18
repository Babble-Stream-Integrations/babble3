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

//types for Quiz
export type TriviaSettings = {
  channel: string;
  startAfter: number;
  questionAmount: number;
  timePerQuestion: number;
  timeInBetween: number;
  elimination: boolean;
};

export type Percentages = {
  amount: number;
  percentage: number;
};

export type QuizBackend = {
  question: string;
  possibilities: string[];
  time: number;
  rightAnswer: string;
  percentages: Percentages[];
  questionIndex: number;
  firstToAnswer: string;
};

export type QuizComponentData = {
  questionAmount: number;
  question: string;
  answers: string[];
  rightAnswer: string;
  percentages: Percentages[];
  questionIndex: number;
};

//type for timer
export type TimeProp = {
  timeProp: {
    time: number;
    initialTime: number;
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      time: number;
      initialTime: number;
    }>
  >;
};

export type Colors = {
  [key: string]: string;
};

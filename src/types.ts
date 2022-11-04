//type for chat
export type Message = {
  username: string;
  message: string;
  color: string | undefined;
};

//type for streamer info
export type Streamer = {
  channel: string;
  uid: string;
};

//types for Quiz
export type TriviaSettings = {
  channel: string;
  startAfter: number;
  questionAmount: number;
  timePerQuestion: number;
  timeInBetween: number;
  eliminations: boolean;
  category: string;
  difficulty: string;
};

export type Percentages = {
  amount: number;
  percentage: number;
};
export type Results = {
  username: string;
  questionIndex: number;
  points: number;
  eliminated: boolean;
};

export type QuizBackend = {
  question: string;
  possibilities: string[];
  time: number;
  rightAnswer: string;
  percentages: Percentages[];
  questionIndex: number;
  firstToGuess: string;
  category: string;
  results: Array<Results>;
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

export type HandleChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

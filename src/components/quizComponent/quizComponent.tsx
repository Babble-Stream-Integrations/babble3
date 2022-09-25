import React, { useState } from "react";
export interface Quiz {
  question: string;
  answers: object | string[] | JSON[];
  correctAnswer: string;
}
export interface Answer {
  answer: string;
}

export default function QuizComponent() {
  const [quiz] = useState<Quiz>({
    question: "Wie heeft de meeste volgers op Twitch?",
    answers: [
      "Leonoor wasmiddel",
      "Leopatra, farao van het oude egypte",
      "Leopold, koning van West-Nederland",
      "Leonardo da Vinci, die schilder van dat schilderij",
    ],

    correctAnswer: "",
  });
  return (
    <div className="flex h-full w-[570px] flex-col gap-[10px] overflow-hidden pt-[50px] text-center text-[30px] font-[500] text-white">
      <div className="flex h-[150px] items-center rounded-b-lg rounded-t-3xl bg-babbleDarkGray p-4">
        <div className="p-[80px]">{quiz.question}</div>
      </div>
      <div className="flex h-[75px] items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center">
        <div className="min-w-[80px]  rounded-lg rounded-bl-3xl bg-gradient-to-r from-quizPinkLight to-quizPinkDark p-4 font-[1000] italic">
          <h1>A</h1>
        </div>
        <div className="w-full pr-[75px] text-[20px]">
          <h1>Casablanca</h1>
        </div>
      </div>
      <div className="flex h-[75px] items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center">
        <div className="min-w-[80px] rounded-lg rounded-bl-3xl bg-gradient-to-r from-quizGoldLight to-quizGoldDark p-4 font-[1000] italic  ">
          <h1>B</h1>
        </div>
        <div className="w-full pr-[75px] text-[20px]">
          <h1>Rabbat</h1>
        </div>
      </div>
      <div className="flex h-[75px] items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center">
        <div className="min-w-[80px] rounded-lg rounded-bl-3xl bg-gradient-to-r from-quizTurqoiseLigt to-quizTurqoiseDark p-4 font-[1000] italic  ">
          <div className="">
            <h1>C</h1>
          </div>
        </div>
        <div className="w-full pr-[75px] text-[20px]">
          <h1>Fez</h1>
        </div>
      </div>
      <div className="flex h-[75px] items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center">
        <div className="min-w-[80px] rounded-lg rounded-bl-3xl bg-gradient-to-tr from-quizBrownLight to-quizBrownDark p-4 font-[1000] italic  ">
          <div className="">D</div>
        </div>
        <div className="w-full pr-[75px] text-[20px]">
          <h1>Sale</h1>
        </div>
      </div>
    </div>
  );
}

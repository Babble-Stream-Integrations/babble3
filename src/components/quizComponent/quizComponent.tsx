import React, { useState } from "react";
import "./quizComponent.css";
import { ImCheckmark } from "react-icons/im";

export type Quiz = {
  qAmount: number;
  questions: Question[];
};
export type Question = {
  qNumber: number;
  question: string;
  answers: Answer[];
};
export type Answer = {
  answer: string;
};

//calculate width based on the percentage of people that gave that answer
function Width(index: number) {
  type answered = {
    percent: number;
  };
  const [answered] = useState<answered[]>([
    {
      percent: 0,
    },
    {
      percent: 0,
    },
    {
      percent: 0,
    },
    {
      percent: 0,
    },
  ]);
  const percentage = answered[index].percent + 10;
  return `${percentage}%`;
}
//check what answer is correct, and if it is correct, show the checkmark
function RightAnswer(index: number) {
  const rightAnswer: number | null = null;
  if (rightAnswer === null) {
    return "hidden";
  } else if (index === rightAnswer) {
    return "visible";
  } else {
    return "hidden";
  }
}

export default function QuizComponent() {
  const [quiz] = useState<Quiz>({
    qAmount: 10,
    questions: [
      {
        qNumber: 1,
        question: "What is the capital of the Netherlands?",
        answers: [
          {
            answer: "Amsterdam",
          },
          {
            answer: "Rotterdam",
          },
          {
            answer: "The Hague",
          },
          {
            answer: "Utrecht",
          },
        ],
      },
    ],
  });

  return (
    // display the question and answers
    <div className="relative w-[570px]">
      <div className="flex flex-col gap-[10px] overflow-hidden text-center text-[30px] font-[500] text-babbleWhite">
        <div className="flex h-[150px] flex-col items-center justify-between rounded-b-lg rounded-t-3xl bg-babbleDarkGray py-4">
          <h1 className="px-4">{quiz.questions[0].question}</h1>
          <div className="flex w-full justify-evenly pt-[10px]">
            {/* make row number for every quiz question */}
            {Array.from({ length: quiz.qAmount }, (_, i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-babbleBlack from-platformDark to-platformLight text-sm first:bg-gradient-to-tr"
              >
                <h3>{i + 1}</h3>
              </div>
            ))}
          </div>
        </div>
        {/* map over possible answers */}
        {quiz.questions[0].answers.map((answer, index) => {
          const letter = String.fromCharCode(65 + index);

          return (
            <div
              key={index}
              className="relative flex h-[75px] items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center"
            >
              <div
                className="absolute z-0 min-w-[80px] rounded-lg rounded-bl-3xl p-4 pl-7 text-left font-[1000] italic"
                id={letter}
                style={{ width: Width(index) }}
              >
                <h1>{letter}</h1>
              </div>
              <div className="z-10 w-full pl-20 text-[20px]">
                {answer.answer}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute right-[-90px] top-0 flex h-full w-20 flex-col justify-end gap-[10px]">
        {quiz.questions[0].answers.map((_, index) => {
          return (
            <div
              key={index}
              className=" flex h-[75px] w-20 items-center justify-center rounded-md bg-gradient-to-r from-[#2BC80C] to-[#157A01] text-4xl text-babbleWhite"
              style={{ visibility: RightAnswer(index) }}
            >
              <ImCheckmark />
            </div>
          );
        })}
      </div>
    </div>
  );
}

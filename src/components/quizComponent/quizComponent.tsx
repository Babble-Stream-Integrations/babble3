import React, { useState } from "react";
import "./quizComponent.css";
import { Streamer } from "../../pages/quiz";

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
      {
        qNumber: 2,
        question: "What is the capital of the United States?",
        answers: [
          {
            answer: "New York",
          },
          {
            answer: "Washington D.C.",
          },
          {
            answer: "Los Angeles",
          },
          {
            answer: "Chicago",
          },
        ],
      },
    ],
  });
  return (
    // display the question and answers
    <div className="flex h-full w-[570px] flex-col gap-[10px] overflow-hidden text-center text-[30px] font-[500] text-white">
      <div className="flex h-[150px] flex-col items-center justify-between rounded-b-lg rounded-t-3xl bg-babbleDarkGray py-4">
        <h1 className="px-4">{quiz.questions[0].question}</h1>
        <div className="flex w-full justify-evenly pt-3">
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
            className="flex h-[75px] items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center"
          >
            <div
              className="min-w-[80px]  rounded-lg rounded-bl-3xl p-4 font-[1000] italic"
              id={letter}
            >
              <h1>{letter}</h1>
            </div>
            <div className="w-full pr-[75px] text-[20px]">{answer.answer}</div>
          </div>
        );
      })}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-small.png";
import QuizComponent from "../../components/quizComponent/quizComponent";
import ChatComponent from "../../components/chatComponent/chatComponent";
import TimerComponent from "../../components/timerComponent/timerComponent";
import { io, Socket } from "socket.io-client";

export type Message = {
  username: string;
  message: string;
  color: string | undefined;
};
//usestate for streamer data
export type Streamer = {
  name: string;
  id: string;
};
export type Q = {
  question: string;
  possibilities: string[];
  time: number;
  rightAnswer: string;
  percentages: Percentages[];
};

export type Percentages = {
  percentage: number;
};

export default function Quiz() {
  const socket: Socket = io("ws://backend-sdjmg6ndkq-ew.a.run.app");
  const location = useLocation();
  const streamer: Streamer = location.state.streamer;
  const platform = location.state.platform;
  const [start, setStart] = useState(false);
  const [q, setQ] = useState<Q>({
    question: "",
    possibilities: [],
    time: 0,
    rightAnswer: "",
    percentages: [],
  });

  useEffect(() => {
    socket.emit("trivia-start", {
      channel: streamer.name,
      startAfter: 1,
      questionAmount: 5,
      timePerQuestion: 5,
      timeInBetween: 5,
    });

    socket.on("game-starting", (data) => {
      console.log("Event: game-starting");
      setQ((prevState) => ({
        ...prevState,
        time: data.in,
      }));
      setStart(true);
    });
    socket.on("question-new", (data) => {
      console.log("Event: question-new");
      setQ((prevState) => ({
        ...prevState,
        question: data.question,
        possibilities: data.possibilities,
        time: data.time,
        rightAnswer: "",
        percentages: [],
      }));
    });
    socket.on("question-finished", (data) => {
      console.log("Event: question-finished");
      setQ((prevState) => ({
        ...prevState,
        rightAnswer: data.rightAnswer,
        percentages: data.percentages,
      }));
    });
    socket.on("game-finished", () => {
      console.log("Event: game-finished");
      socket.disconnect();
    });
  }, []);
  return (
    <div className="bg-babbleBlack" data-theme={platform}>
      <Link to="/">
        <div className="absolute top-[50px] left-[50px] z-0 h-11 w-min whitespace-nowrap rounded-full bg-white px-[30px] py-[15px] text-[18px] font-[1000] uppercase">
          <div className="flex h-full items-center justify-center">
            Quit game
          </div>
        </div>
      </Link>
      <div className="z-10 flex h-screen  flex-1 items-center justify-center gap-[50px]">
        <ChatComponent streamer={streamer} platform={platform} />
        <div className="z-10 flex h-full flex-col gap-[50px] py-[50px]">
          <QuizComponent
            question={q.question}
            answers={q.possibilities}
            rightAnswer={q.rightAnswer}
            percentages={q.percentages}
          />
          {start && <TimerComponent time={q.time} />}
        </div>
      </div>
      <div className="absolute left-[50px] bottom-[50px]">
        <Link to="/">
          <img src={logo} className="h-[45px] w-[45px]" alt="logo" />
        </Link>
      </div>
    </div>
  );
}

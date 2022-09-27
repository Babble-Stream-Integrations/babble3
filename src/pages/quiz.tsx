import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-small.png";
import QuizComponent from "../components/quizComponent/quizComponent";
import ChatComponent from "../components/chatComponent/chatComponent";
import TimerComponent from "../components/timerComponent/timerComponent";

export type Message = {
  username: string;
  message: string;
  color: string | undefined;
};
//usestate for streamer data
export type Streamer = {
  name: string;
  id: string;
  platform: string;
};

export default function Quiz() {
  //hardcoded streamer data
  const [streamer] = useState<Streamer>({
    name: "esl_csgo",
    id: "56951019",
    platform: "twitch",
  });

  const [initialTimer] = useState(10);
  return (
    <div className="bg-babbleBlack" data-theme={streamer.platform}>
      <div className="absolute top-[50px] left-[50px] z-0 h-11 w-min whitespace-nowrap rounded-full bg-white px-[30px] py-[15px] text-[18px] font-[1000] uppercase">
        <div className="flex h-full items-center justify-center">
          <Link to="/"> Quit game </Link>
        </div>
      </div>
      <div className="z-10 flex h-screen  flex-1 items-center justify-center gap-[50px]">
        <ChatComponent streamer={streamer} />
        <div className="z-10 flex h-full flex-col gap-[50px] py-[50px]">
          <QuizComponent />
          <TimerComponent initialTimer={initialTimer} />
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

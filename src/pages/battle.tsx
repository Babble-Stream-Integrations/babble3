import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-small.png";
import ChatComponent from "../components/chatComponent/chatComponent";

export interface Message {
  username: string;
  message: string;
  color: string | undefined;
}

export default function Battle() {
  //usestate for streamer data
  type Streamer = {
    name: string;
    id: string;
    platform: string;
  };

  //hardcoded streamer data
  const [streamer] = useState<Streamer>({
    name: "esl_csgo",
    id: "56951019",
    platform: "twitch",
  });

  return (
    <div className="bg-babbleBlack">
      <div className="absolute top-[50px] left-[50px] h-11 w-min whitespace-nowrap rounded-full bg-white px-[30px] py-[15px] text-[18px] font-[1000] uppercase">
        <div className="flex h-full items-center justify-center">
          <Link to="/"> Quit game </Link>
        </div>
      </div>
      <div className="flex h-screen flex-1 items-center justify-evenly">
        <ChatComponent streamer={streamer} />
      </div>
      <div className="absolute left-[50px] bottom-[50px]">
        <Link to="/">
          <img src={logo} className="h-[45px] w-[45px]" alt="logo" />
        </Link>
      </div>
    </div>
  );
}

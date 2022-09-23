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
      <div className="absolute top-8 left-16 h-11 w-min whitespace-nowrap rounded-full bg-white px-5 text-xl font-bold">
        <div className="flex h-full items-center justify-center">
          <Link to="/"> Quit game </Link>
        </div>
      </div>
      <div className="flex h-screen flex-1 items-center justify-evenly">
        <ChatComponent streamer={streamer} />
      </div>
      <div className="absolute left-8 bottom-8">
        <img src={logo} className="h-10 w-10" alt="logo" />
      </div>
    </div>
  );
}

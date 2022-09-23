import React, { useState } from "react";
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
      <div className="flex h-screen flex-1 items-center justify-evenly">
        <ChatComponent streamer={streamer} />
      </div>
      <div className="absolute left-8 bottom-8">
        <img src={logo} className="h-10 w-10" alt="logo" />
      </div>
    </div>
  );
}

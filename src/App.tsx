import React, { useState } from "react";
import logo from "./assets/logo-small.png";
import ChatComponent from "./components/chatComponent/chatComponent";

function App() {
  //usestate for streamer data
  type Streamer = {
    name: string;
    id: string;
    platform: string;
  };

  //hardcoded streamer data
  const [streamer] = useState<Streamer>({
    name: "xqc",
    id: "123",
    platform: "twitch",
  });

  return (
    <header className="App-header bg-babbleBlack">
      <div className="flex h-screen flex-1 flex-col items-center justify-center">
        <ChatComponent streamer={streamer} />
      </div>
      <div className="absolute left-8 bottom-8">
        <img src={logo} className="h-10 w-10" alt="logo" />
      </div>
    </header>
  );
}

export default App;

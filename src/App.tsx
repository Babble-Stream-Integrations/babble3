import React, { useState } from "react";
import logo from "./assets/logo-small.png";
import TwitchChat from "./components/twitchChat/twitchChat";

//streamername usestate

function App() {
  const [streamerName, setStreamerName] = useState<Streamer>({
    name: "xqc",
  });
  interface Streamer {
    name: string;
  }
  return (
    <header className="App-header bg-babbleBlack">
      <div className="flex h-screen flex-1 flex-col items-center justify-center">
        <TwitchChat streamer={streamerName} />
      </div>
      <div className="absolute left-8 bottom-8">
        <img src={logo} className="h-10 w-10" alt="logo" />
      </div>
    </header>
  );
}

export default App;

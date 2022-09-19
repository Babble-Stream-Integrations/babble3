import React from "react";
import logo from "./assets/logo-small.png";

function App() {
  return (
    <header className="App-header bg-babbleBlack">
      <div className="flex flex-1 justify-center h-screen items-center flex-col">
        <h1 className="font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-babbleRed to-babbleYellow">
          Babble
        </h1>
        <h2 className="text-white">test</h2>
      </div>
      <div className="absolute left-8 bottom-8">
        <img src={logo} className="w-10 h-10" alt="logo" />
      </div>
    </header>
  );
}

export default App;

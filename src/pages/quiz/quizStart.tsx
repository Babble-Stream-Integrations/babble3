import React from "react";
import logoBig from "../../assets/logo-full.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuizStart() {
  const navigate = useNavigate();
  const location = useLocation();
  const streamer = location.state.streamer;

  function ButtonClicked() {
    navigate("/quiz", {
      state: { streamer: streamer, platform: location.state.platform },
    });
  }

  return (
    <header className="flex min-h-screen items-center justify-center overflow-hidden bg-babbleBlack">
      <div className="z-10 flex h-[404px] w-[551px] flex-col items-center justify-center gap-4 rounded-lg bg-babbleGray text-center">
        <h1 className=" py pb-8 text-4xl font-bold text-babbleWhite">
          Hi {streamer.name},
        </h1>
        <p className="px-16 pb-2 text-babbleLightGray">
          When the game starts you&apos;Il get a series of 10 trivia questions.
          You and your chat may answer by typing A, B, C or D in chat.
        </p>
        <p className="px-16 pb-2 font-thin text-babbleLightGray">
          Good luck, and have fun!
        </p>
        <button
          onClick={() => {
            ButtonClicked();
          }}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-babbleYellow to-babbleRed px-8 text-xl font-[900] uppercase text-babbleGray  hover:from-babbleOrange hover:to-babbleRed"
        >
          Start Game
        </button>
      </div>
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] items-start justify-start rounded-br-full bg-gradient-to-t from-babbleYellow to-babbleRed ">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-br-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-0 bottom-0 flex h-[30rem] w-[30rem] items-end justify-end rounded-tl-full bg-gradient-to-t from-babbleLightblue to-babbleDarkblue ">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-tl-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-20 top-16">
        <img src={logoBig} className="h-10"></img>
      </div>
      <div className="absolute bottom-0 "></div>
    </header>
  );
}

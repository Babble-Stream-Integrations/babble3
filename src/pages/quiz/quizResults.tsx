import React from "react";
import { Link } from "react-router-dom";
import logoBig from "../../assets/logo-full.png";

export default function QuizResults() {
  return (
    <header className="flex min-h-screen items-center justify-center overflow-hidden bg-babbleBlack">
      <div className="z-10 flex h-[404px] w-[551px] flex-col items-center justify-center gap-4 rounded-lg bg-babbleGray">
        <h1 className="py text-4xl font-bold text-babbleWhite">Great job!</h1>
        <p className="pb-2 text-babbleLightGray">
          You and your viewers answered 6/10 questions correct!
        </p>
        <Link to="/quizStart">
          <button className="flex h-12 items-center  justify-center gap-2 rounded-full bg-gradient-to-tr from-babbleYellow to-babbleRed px-8 text-xl font-bold uppercase text-babbleWhite  hover:from-babbleOrange hover:to-babbleRed">
            Play Again
          </button>
        </Link>
      </div>
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] items-start justify-start rounded-br-full bg-gradient-to-t from-babbleYellow to-babbleRed">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-br-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-0 bottom-0 flex h-[30rem] w-[30rem] items-end justify-end rounded-tl-full bg-gradient-to-t from-babbleLightblue to-babbleDarkblue">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-tl-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-20 top-16">
        <img src={logoBig} className="h-10"></img>
      </div>
      <div className="absolute bottom-0"></div>
    </header>
  );
}

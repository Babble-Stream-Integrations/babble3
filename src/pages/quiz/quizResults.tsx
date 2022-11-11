import React from "react";
import { Link } from "react-router-dom";

export default function QuizResults() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-radial from-[#202024] to-[#0E0E10]">
      <h1 className="pb-[10px] text-4xl font-bold text-white">Winners</h1>
      <div className="relative z-10 flex h-[404px] w-[551px] flex-col items-center justify-center gap-4 rounded-babble bg-babbleDarkGray drop-shadow-xl">
        <p className="pb-2 text-babbleWhite">
          You and your viewers answered 6/10 questions correct!
        </p>
        <Link
          to={"/"}
          className="absolute bottom-[-50px] flex rounded-full bg-babbleLightGray px-10 py-2 font-bold uppercase text-babbleBlack"
        >
          continue
        </Link>
      </div>

      {/* Hiddes circels, met je poten vanaf blijven :)
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] items-start justify-start rounded-br-full bg-gradient-to-t from-babbleYellow to-babbleRed">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-br-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-0 bottom-0 flex h-[30rem] w-[30rem] items-end justify-end rounded-tl-full bg-gradient-to-t from-babbleLightblue to-babbleDarkblue">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-tl-full bg-babbleBlack"></div>
      </div> */}
      <div className="absolute bottom-0"></div>
    </div>
  );
}

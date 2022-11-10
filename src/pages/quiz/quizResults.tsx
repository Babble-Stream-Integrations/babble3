import { database } from "firebase-functions/v1";
import { result } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import ResultsComponent from "../../components/resultsComponent/resultsComponent";

export default function QuizResults(results: data.results) {
  //define places
  const placements = [{
    Place: "Second"
    icon: {results.icon}
    Name: {results.username[]}


  }];j

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-radial from-[#202024] to-[#0E0E10]">
      <h1 className="pb-[10px] text-4xl font-bold text-white">Winners</h1>

        {placements.map((results: any, index: [0, 2]) => {
          return(
          <div className="relative z-10 flex h-[404px] w-[551px] flex-col items-center justify-center gap-4 rounded-babble bg-babbleDarkGray drop-shadow-xl">
           <h1 className="pb-[5px]">{results.username}</h1>
          </div>
  )})}


      <Link
        to={"/"}
        className="absolute bottom-[-50px] flex rounded-full bg-babbleLightGray px-10 py-2 font-bold uppercase text-babbleBlack"
      >
        continue
      </Link>
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

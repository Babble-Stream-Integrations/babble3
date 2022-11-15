import { database } from "firebase-functions/v1";
import React from "react";
import { Link } from "react-router-dom";
import hexToHSLGradient from "../../components/quizComponent/hexToHSLGradient";
import ResultsComponent from "../../components/resultsComponent/resultsComponent";

export default function QuizResults() {
  //define places
  const placements = [
    {
      place: "second",
      color: "#646464",
      size: 0.8,
    },
    {
      place: "first",
      color: "#A47200",
      size: 1,
    },
    {
      place: "third",
      color: "#4D2D11",
      size: 0.8,
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-radial from-[#202024] to-[#0E0E10] p-4 uppercase text-babbleWhite">
      <h1 className="pb-[10px] text-4xl font-bold ">Winners</h1>
      <div className="flex gap-4">
        {placements.map((placement, index) => {
          console.log(placement);
          return (
            <div
              className="relative inset-0 z-10 flex h-[568px] w-[325px] flex-col justify-center gap-4 rounded-babble border border-babbleGray bg-babbleGray/5 p-4 text-left text-[18px] shadow-babble backdrop-blur-babble"
              key={index}
              style={{
                height: "568px",
                width: "325px",
                transform: `scale(${placement.size})`,
              }}
            >
              <div
                className="w-full rounded-full p-4"
                style={{
                  backgroundImage: hexToHSLGradient(
                    placement.color,
                    "right",
                    "20",
                    "lighter",
                    40
                  ),
                }}
              >
                <div className="rounded-full ">
                  <img
                    className="rounded-full "
                    src="https://static-cdn.jtvnw.net/user-default-pictures-uv/ead5c8b2-a4c9-4724-b1dd-9f00b46cbd3d-profile_image-300x300.png"
                    alt="first place"
                  />
                </div>
              </div>
              <div className="flex h-1/2 flex-col justify-evenly">
                <h1 className="text-center text-[25px] normal-case">Lionel</h1>
                <h1 className="">Score 100000</h1>
                <h1 className="">Right</h1>
                <h1 className="">Wrong</h1>
                <h1 className="">Reaction time</h1>
                <h1 className="">Rounds leading</h1>
              </div>
            </div>
          );
        })}
      </div>
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

import { Link, Navigate, useLocation } from "react-router-dom";
import hexToHSLGradient from "../../common/hexToHSLGradient";
import { optionsToEndpoint } from "firebase-functions/v1";
import { result } from "lodash";
import { FaTrophy } from "react-icons/fa";

export default function QuizResults() {
  //get top 3 results from quiz page based on highest score
  const quizResults = useLocation().state?.results;
  if (!quizResults) {
    return <Navigate to="/quiz" />;
  }
  console.log(quizResults);
  //eslint-disable-next-line
  quizResults.sort((a: any, b: any) => b.points - a.points);

  const placements = [
    ...(quizResults.length > 1
      ? [
          {
            place: "2",
            color: "#646464",
            size: 0.8,
            profile: quizResults[1].profile,
            troph: trophy2,
            username: quizResults[1].username,
            points: quizResults[1].points,
            answeredRight: quizResults[1].correctAnswers,
            answeredWrong: quizResults[1].wrongAnswers,
          },
        ]
      : []),
    ...(quizResults.length > 0
      ? [
          {
            place: "1",
            color: "#A47200",
            size: 1,
            profile: quizResults[0].profile,
            username: quizResults[0].username,
            points: quizResults[0].points,
            answeredRight: quizResults[0].correctAnswers,
            answeredWrong: quizResults[0].wrongAnswers,
          },
        ]
      : []),
    ...(quizResults.length > 2
      ? [
          {
            place: "3",
            color: "#4D2D11",
            size: 0.6,
            profile: quizResults[2].profile,
            username: quizResults[2].username,
            points: quizResults[2].points,
            answeredRight: quizResults[2].correctAnswers,
            answeredWrong: quizResults[2].wrongAnswers,
          },
        ]
      : []),
  ];

  console.log(placements);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-radial from-[#202024] to-[#0E0E10] p-4 uppercase text-babbleWhite">
      <h1 className="pb-[10px] text-4xl font-bold ">Winners</h1>
      <div className="flex gap-4">
        {placements.length > 0 ? (
          placements.map((placement, index) => {
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
                      src={placement.profile}
                      alt="first place"
                    />
                    <div className="absolute inset-0 bottom-[60px] z-10 flex items-center justify-center ">
                      <FaTrophy
                        size="4em"
                        style={{
                          color: placement.color,
                        }}
                      />
                      <div className="absolute inset-0 bottom-[20px] z-10 flex items-center justify-center ">
                        <h1>{placement.place}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex h-1/2 flex-col justify-evenly">
                  <h1 className="text-center text-[25px] normal-case">
                    {placement.username}
                  </h1>
                  <div className="flex justify-between">
                    <h1 className="">Score </h1>
                    <h1 className="">{placement.points}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="">Answered Right </h1>
                    <h1 className="">{placement.answeredRight}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="">Answered Wrong </h1>
                    <h1 className="">{placement.answeredWrong}</h1>
                  </div>
                  {/* <div className="flex justify-between">
                  <h1 className="">Reaction time</h1>
                  <h1 className=""></h1>
                </div> */}
                  {/* <div className="flex justify-between">
                  <h1 className="">Rounds leading</h1>
                  <h1 className=""></h1>
                </div> */}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No one participated!</h1>
        )}
      </div>
      <div>
        <Link
          to={"/"}
          className="absolute bottom-[-100px] flex rounded-full bg-babbleLightGray px-10 py-2 font-bold uppercase text-babbleBlack"
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

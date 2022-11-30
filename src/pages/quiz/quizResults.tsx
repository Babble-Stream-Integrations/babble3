import { Navigate, useLocation } from "react-router-dom";
import hexToHSLGradient from "../../common/hexToHSLGradient";
import { FaTrophy } from "react-icons/fa";
import { DefaultButton } from "../../components/defaultButton/defaultButton";
import { useNavigate } from "react-router-dom";

export default function QuizResults() {
  const navigate = useNavigate();
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
            trophy: {
              startColor: "#A4A4A4",
              endColor: "#B8B8B8",
            },
            size: 0.7,
            profile: quizResults[1].profile,
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
            trophy: {
              startColor: "#E1B44A",
              endColor: "#F0C45D",
            },
            size: 0.9,
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
            trophy: {
              startColor: "#A56B39",
              endColor: "#C28045",
            },
            size: 0.7,
            profile: quizResults[2].profile,
            username: quizResults[2].username,
            points: quizResults[2].points,
            answeredRight: quizResults[2].correctAnswers,
            answeredWrong: quizResults[2].wrongAnswers,
          },
        ]
      : []),
  ];

  function getTrophy(placement: string, startColor: string, endColor: string) {
    return (
      <linearGradient
        id={`gradient-${placement}`}
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
      >
        <stop stopColor={startColor} offset="0%" />
        <stop stopColor={endColor} offset="100%" />
      </linearGradient>
    );
  }

  return (
    <div className="relative overflow-hidden p-4 text-center uppercase text-babbleWhite">
      <div className="flex gap-4">
        {placements.length > 0 ? (
          placements.map((placement, index) => {
            return (
              <div
                className="inset-0 z-10 flex flex-col justify-center gap-4 rounded-babble border border-babbleGray bg-babbleGray/5 p-4 text-left text-[18px] shadow-babble backdrop-blur-babble"
                key={index}
                style={{
                  height: "auto",
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
                  <div className="relative rounded-full">
                    <img
                      className="rounded-full "
                      src={placement.profile}
                      alt="first place"
                    />
                    <div className=" absolute bottom-[-5px] left-0 right-0 z-10 flex items-center justify-center bg-transparent">
                      <svg width="0" height="0">
                        {getTrophy(
                          placement.place,
                          placement.trophy.startColor,
                          placement.trophy.endColor
                        )}
                      </svg>
                      <FaTrophy
                        size="4em"
                        className=""
                        style={{ fill: `url(#gradient-${placement.place})` }}
                      />
                      <div className="absolute inset-0 bottom-[20px] z-10 flex items-center justify-center">
                        <h2>{placement.place}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex h-1/2 flex-col justify-evenly gap-[18px]">
                  <h2 className="text-center text-[20px] normal-case">
                    {placement.username}
                  </h2>
                  <div className="flex justify-between">
                    <h2 className="">Score </h2>
                    <h2 className="">{placement.points}</h2>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="">Answered Right </h2>
                    <h2 className="">{placement.answeredRight}</h2>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="">Answered Wrong </h2>
                    <h2 className="">{placement.answeredWrong}</h2>
                  </div>
                  {/* <div className="flex justify-between">
                  <h2 className="">Reaction time</h2>
                  <h2 className=""></h2>
                </div> */}
                  {/* <div className="flex justify-between">
                  <h2 className="">Rounds leading</h2>
                  <h2 className=""></h2>
                </div> */}
                </div>
              </div>
            );
          })
        ) : (
          <h2>No one participated!</h2>
        )}
      </div>
      <DefaultButton
        text="Continue"
        buttonClick={() => {
          navigate("/");
        }}
      />
      {/* Hiddes circels, met je poten vanaf blijven :)
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] items-start justify-start rounded-br-full bg-gradient-to-t from-babbleYellow to-babbleRed">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-br-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-0 bottom-0 flex h-[30rem] w-[30rem] items-end justify-end rounded-tl-full bg-gradient-to-t from-babbleLightblue to-babbleDarkblue">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-tl-full bg-babbleBlack"></div>
      </div> */}
    </div>
  );
}

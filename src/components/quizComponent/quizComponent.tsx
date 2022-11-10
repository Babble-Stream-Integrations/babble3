import { AutoTextSize } from "auto-text-size";
import { Percentages, QuizComponentData } from "../../types";
import useLocalStorageState from "use-local-storage-state";
import hexToHSLGradient from "./hexToHSLGradient";
import { useMemo } from "react";
import TimerComponent from "../timerComponent/timerComponent";

export default function QuizComponent({ quiz }: { quiz: QuizComponentData }) {
  // calculate width based on the percentage of people that gave that answer
  function width(index: number, percentages: Percentages[]) {
    if (percentages[index] === undefined) {
      return "0%";
    } else {
      return `${percentages[index].percentage + 10}%`;
    }
  }

  //get color from localstorage and convert to gradient with HSL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [colors]: any = useLocalStorageState("colors", {
    defaultValue: {
      a: "#E42256",
      b: "#FDC74C",
      c: "#00B1B0",
      d: "#FF8370",
    },
  });

  function Color(letter: string) {
    const hex: string = useMemo(() => colors[letter.toLowerCase()], [letter]);
    const hslGradient = useMemo(
      () => hexToHSLGradient(hex, "right", "50", "darker"),
      [hex]
    );
    return hslGradient;
  }

  //check what answer is correct, and if it is correct, show the checkmark
  function rightAnswer(answer: string, rightAnswer: string) {
    if (rightAnswer === "") {
      return "#E6E6E6";
    } else if (answer === rightAnswer) {
      return "#1D981D";
    } else {
      return "#D22A2A";
    }
  }

  return (
    // display the question and answers
    <div className="relative h-full w-full rounded-babble border border-babbleGray bg-babbleLightGray/5 p-3.5 text-white shadow-babbleOuter backdrop-blur-babble">
      <div className="flex h-full flex-col gap-[15px] overflow-hidden text-center text-[30px] font-[500] text-babbleWhite">
        <div className="flex h-2/6 flex-col items-center justify-between rounded-babbleSmall bg-babbleDarkerGray text-[10rem] shadow-babble">
          <div className="h-3/6 p-5">
            <AutoTextSize
              multiline={true}
              maxFontSizePx={28}
              dangerouslySetInnerHTML={{ __html: quiz.question }}
            />
          </div>
          <div className="flex h-7 w-full justify-evenly bg-babbleDarkerGray px-[3px]">
            {/* make row number for every quiz question */}
            {Array.from({ length: quiz.questionAmount }, (_, i) => (
              <div
                key={i}
                //if the current question is the same as the row number, color it
                className={`flex h-7 w-7 items-center justify-center rounded-babbleSmall bg-babbleBlack from-platformDark to-platformLight text-sm ${
                  quiz.questionIndex === i + 1 && " bg-gradient-to-tr"
                }`}
              >
                <h3>{i + 1}</h3>
              </div>
            ))}
          </div>
          <TimerComponent
            initialTime={quiz.time}
            questionIndex={quiz.questionIndex}
          />
        </div>
        {/* map over possible answers */}
        {quiz.possibilities.map((answer, index) => {
          const letter = String.fromCharCode(65 + index);
          return (
            <div
              key={index}
              className="relative flex h-1/6 items-center overflow-hidden rounded-babbleSmall bg-babbleDarkerGray text-center shadow-babble backdrop-blur-babble"
            >
              <div
                className="absolute z-0 flex h-full min-w-[min(17%,_80px)] items-center rounded-l-babbleSmall p-4 pl-[min(5%,_25px)] text-left font-[1000] italic text-white"
                style={{
                  width: width(index, quiz.percentages),
                  backgroundImage: Color(letter),
                }}
              >
                <h1>{letter}</h1>
              </div>
              <div className="z-10 ml-20 w-full max-w-full justify-center text-center ">
                <AutoTextSize
                  multiline={false}
                  maxFontSizePx={20}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </div>
              <div
                className="z-10 h-full w-4 "
                style={{
                  backgroundColor: rightAnswer(answer, quiz.rightAnswer),
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

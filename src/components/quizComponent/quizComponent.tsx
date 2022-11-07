import { ImCheckmark } from "react-icons/im";
import { AutoTextSize } from "auto-text-size";
import { Percentages, QuizComponentData } from "../../types";
import useLocalStorageState from "use-local-storage-state";
import hexToHSLGradient from "./hexToHSLGradient";

export default function QuizComponent(quiz: QuizComponentData) {
  // calculate width based on the percentage of people that gave that answer
  function width(index: number, percentages: Percentages[]) {
    if (percentages[index] === undefined) {
      return 0;
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

  function color(letter: string) {
    const hex: string = colors[letter.toLowerCase()];
    const hslGradient = hexToHSLGradient(hex, "right", "50", "darker");
    return hslGradient;
  }

  //check what answer is correct, and if it is correct, show the checkmark
  function rightAnswer(answer: string, rightAnswer: string) {
    if (rightAnswer === "") {
      return "hidden";
    } else if (answer === rightAnswer) {
      return "visible";
    } else {
      return "hidden";
    }
  }

  return (
    // display the question and answers
    <div className="relative h-full w-full max-w-[600px]">
      <div className="flex h-full flex-col gap-[10px] overflow-hidden text-center text-[30px] font-[500] text-babbleWhite">
        <div className="flex h-2/6 flex-col items-center justify-between  rounded-t-3xl bg-babbleDarkGray pt-4 pb-2 text-[10rem]">
          <div className="h-4/6 px-4 pb-2">
            <AutoTextSize
              multiline={true}
              dangerouslySetInnerHTML={{ __html: quiz.question }}
            />
          </div>
          <div className="flex h-2/6 w-full justify-evenly  pt-1">
            {/* make row number for every quiz question */}
            {Array.from({ length: quiz.questionAmount }, (_, i) => (
              <div
                key={i}
                //if the current question is the same as the row number, color it
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-babbleBlack from-platformDark to-platformLight text-sm  ${
                  quiz.questionIndex === i + 1 && " bg-gradient-to-tr"
                }`}
              >
                <h3>{i + 1}</h3>
              </div>
            ))}
          </div>
        </div>
        {/* map over possible answers */}
        {quiz.answers.map((answer, index) => {
          const letter = String.fromCharCode(65 + index);
          return (
            <div
              key={index}
              className="relative flex h-1/6 items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center"
            >
              <div
                className="absolute z-0 min-w-[80px] rounded-lg rounded-bl-3xl p-4 pl-7 text-left font-[1000] italic text-white"
                style={{
                  width: width(index, quiz.percentages),
                  backgroundImage: color(letter),
                }}
              >
                <h1>{letter}</h1>
              </div>
              <div
                className="z-10 w-full pl-20 text-[20px]"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </div>
          );
        })}

        <div className="absolute right-[-90px] top-0 flex h-full w-20 flex-col justify-end gap-[10px]">
          <div className="h-2/6  pb-6" />
          {quiz.answers.map((answer, index) => {
            return (
              <div
                key={index}
                className=" flex h-1/6 w-20 items-center justify-center rounded-md bg-gradient-to-r from-[#2BC80C] to-[#157A01] text-4xl text-babbleWhite"
                style={{ visibility: rightAnswer(answer, quiz.rightAnswer) }}
              >
                <ImCheckmark />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

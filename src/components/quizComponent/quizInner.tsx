import { AutoTextSize } from "auto-text-size";
import { useMemo } from "react";
import useLocalStorageState, {
  type LocalStorageState,
} from "use-local-storage-state";
import hexToHSLGradient from "../../common/hexToHSLGradient";
import { Percentages, QuizComponentData } from "../../types";
import TimerComponent from "../timerComponent/timerComponent";
import { motion } from "framer-motion";

export default function QuizInner({ quiz }: { quiz: QuizComponentData }) {
  //get color from localstorage and convert to gradient with HSL
  const [colors]: LocalStorageState<{
    a: string;
    b: string;
    c: string;
    d: string;
  }> = useLocalStorageState("colors", {
    defaultValue: {
      a: "#E42256",
      b: "#FDC74C",
      c: "#00B1B0",
      d: "#FF8370",
    },
  });

  function Color(letter: string) {
    let hex = "";
    switch (letter.toLowerCase()) {
      case "a":
        hex = colors.a;
        break;
      case "b":
        hex = colors.b;
        break;
      case "c":
        hex = colors.c;
        break;
      case "d":
        hex = colors.d;
        break;
      default:
        hex = colors.a;
        break;
    }
    const hslGradient = useMemo(
      () => hexToHSLGradient(hex, "right", "50", "darker"),
      [hex]
    );
    return hslGradient;
  }
  function Width(index: number, percentages: Percentages[]) {
    if (percentages[index] === undefined) {
      return "0%";
    } else {
      let percentage = percentages[index].percentage + 10;
      if (percentage > 100) {
        percentage = 98;
      }
      return `${percentage}%`;
    }
  }

  //check what answer is correct, and if it is correct, show the checkmark
  function RightAnswer(answer: string, rightAnswer: string) {
    if (rightAnswer === "") {
      return "#E6E6E6";
    } else if (answer === rightAnswer) {
      return "#1D981D";
    } else {
      return "#D22A2A";
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const item = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        bounce: 0,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col gap-[15px] overflow-hidden text-center text-[30px] font-[500] text-babbleWhite"
    >
      <div className="flex h-[40%] flex-col items-center justify-between rounded-babbleSmall bg-babbleDarkerGray px-6 text-[10rem] shadow-babble backdrop-blur-babble">
        <div className="flex h-full items-center py-5">
          <AutoTextSize
            multiline={true}
            maxFontSizePx={28}
            dangerouslySetInnerHTML={{ __html: quiz.question }}
          />
        </div>
        <div className="flex h-7 w-full justify-evenly bg-babbleDarkerGray">
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
          <motion.div
            variants={item}
            key={index}
            className="relative flex h-1/6 items-center rounded-babbleSmall bg-babbleDarkerGray text-center shadow-babble backdrop-blur-babble"
          >
            <div
              className="absolute z-0 flex h-full min-w-[min(17%,_80px)] items-center rounded-l-babbleSmall pl-[min(5%,_25px)] text-left font-[1000] italic text-white"
              style={{
                width: Width(index, quiz.percentages),
                backgroundImage: Color(letter),
              }}
            >
              <h1>{letter}</h1>
            </div>
            <div className="z-10 ml-20 w-full max-w-full justify-center text-center ">
              <AutoTextSize
                multiline={true}
                maxFontSizePx={20}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </div>
            <div
              className="z-10 h-full w-4 rounded-r-babbleSmall shadow-babble backdrop-blur-babble"
              style={{
                backgroundColor: RightAnswer(answer, quiz.rightAnswer),
              }}
            ></div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

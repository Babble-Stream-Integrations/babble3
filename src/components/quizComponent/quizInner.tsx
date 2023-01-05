import { AutoTextSize } from "auto-text-size";
import { useMemo } from "react";
import useLocalStorageState, {
  type LocalStorageState,
} from "use-local-storage-state";
import hexToHSLGradient from "../../common/hexToHSLGradient";
import { Percentages, QuizComponentData } from "../../types";
import TimerComponent from "../timerComponent/timerComponent";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

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

    //generate a gradient for the background of the answers
    const hslGradient = useMemo(
      () => hexToHSLGradient(hex, "right", "50", "darker"),
      [hex]
    );
    return hslGradient;
  }

  /*
      use the useMeasure hook to get the width and height of the div.
      This is used to calculate the width of the background of the answers.
  */
  const [ref, bounds] = useMeasure();

  /*
      caluculate the width of the background of the answers.
      default is a square around the letter.
      when the answers are received from the back end,
      the width is calculated based on the percentage of people who gave that answer.
   */

  function Width(index: number, percentages: Percentages[]) {
    if (percentages[index] === undefined) {
      return `${bounds.height}px`;
    } else {
      let percentage = percentages[index].percentage + 10;
      if (percentage > 100) {
        percentage = 98;
      }
      if (percentage < bounds.height) {
        return `${bounds.height}px`;
      }
      return `${percentage}%`;
    }
  }

  //calculate the padding for the letter to be perfectly centered
  const Padding = useMemo(() => {
    return bounds.height === 0 ? "0px 0px" : `0 ${bounds.height / 2 - 12}px`;
  }, [bounds.height]);

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
            mode="box"
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
            ref={ref}
            className="relative flex h-1/6 items-center rounded-babbleSmall bg-babbleDarkerGray text-center shadow-babble backdrop-blur-babble"
          >
            <div
              className="absolute z-0 flex h-full items-center rounded-l-babbleSmall text-left font-[1000] italic text-white"
              style={{
                width: Width(index, quiz.percentages),
                backgroundImage: Color(letter),
                padding: Padding,
              }}
            >
              <h1>{letter}</h1>
            </div>
            <div className="z-10 ml-20 w-full max-w-full justify-center text-center ">
              <AutoTextSize
                mode="box"
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

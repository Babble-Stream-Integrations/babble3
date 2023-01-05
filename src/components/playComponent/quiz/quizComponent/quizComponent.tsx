import { motion } from "framer-motion";
import QuizInner from "./quizInner";
import type { QuizComponentData } from "types";

export default function QuizComponent({
  quiz,
  start,
}: {
  quiz: QuizComponentData;
  start: boolean;
}) {
  return (
    // display the question and answers
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.1,
      }}
      transition={{
        duration: 0.5,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      className="relative h-full w-full rounded-babble border border-babbleGray bg-babbleLightGray/5 p-3.5 text-babbleWhite shadow-babbleOuter backdrop-blur-babble"
    >
      {!start ? (
        <div className="flex h-full items-center justify-center">
          <h2 className="text-babbleGray">
            HIT THE <span className="text-babbleWhite">PLAY</span> BUTTON TO
            START
          </h2>
        </div>
      ) : (
        <QuizInner quiz={quiz} />
      )}
    </motion.div>
  );
}

import { QuizComponentData } from "../../types";
import QuizInner from "./quizInner";

export default function QuizComponent({
  quiz,
  start,
}: {
  quiz: QuizComponentData;
  start: boolean;
}) {
  return (
    // display the question and answers
    <div className="relative h-full w-full rounded-babble border border-babbleGray bg-babbleLightGray/5 p-3.5 text-babbleWhite shadow-babbleOuter backdrop-blur-babble">
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
    </div>
  );
}

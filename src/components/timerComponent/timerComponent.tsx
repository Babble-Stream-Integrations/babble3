import React from "react";
import { MdTimer } from "react-icons/md";

export default function TimerComponent(props: { initialTimer: number }) {
  //logic for timer bar
  //total amount of time
  const initialTimer = props.initialTimer;
  // subtract 1 every second
  const [counter, setCounter] = React.useState(initialTimer);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  //calculate percentage: seconds left / by total amount of time x 100
  const percentage = (counter / initialTimer) * 100;
  //making a string with % from a number
  const barWidth = `${percentage}%`;

  let timerColor = "white";
  counter === 0 ? (timerColor = "red") : (timerColor = "white");

  return (
    <div className="flex items-center gap-2 rounded-babble bg-babbleDarkGray p-8 text-3xl text-babbleWhite">
      <MdTimer
        className={
          counter === 0
            ? "w-12 animate-ping-short text-5xl text-[red] delay-1000 animation-delay-1000"
            : "text-5xl text-babbleWhite"
        }
      />
      <div className="relative left-6 mr-8 flex h-10 w-full items-center justify-center overflow-hidden rounded-full bg-babbleGray">
        <div
          className={
            counter <= 5 && counter > 0 ? "z-10 animate-ping text-xl" : "z-10"
          }
          style={{
            color: timerColor,
          }}
        >
          {counter}
        </div>
        <div
          className="transition-width absolute left-0 h-10 rounded-full rounded-r-none bg-gradient-to-r from-platformDark to-platformLight duration-1000 ease-linear"
          style={{ width: barWidth }}
        ></div>
      </div>
    </div>
  );
}

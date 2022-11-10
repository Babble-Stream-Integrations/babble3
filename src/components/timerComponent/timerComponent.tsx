import React, { useEffect, useState } from "react";
import { MdTimer } from "react-icons/md";

type Time = {
  initialTime: number;
  questionIndex: number;
};

export default function TimerComponent({ initialTime, questionIndex }: Time) {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(initialTime);
  //wait for questionIndex to change before starting the timer
  useEffect(() => {
    if (questionIndex !== 0) {
      setStart(true);
      setTime(initialTime);
    }
  }, [questionIndex]);

  //start timer. When time is 0, stop timer and set start to false
  useEffect(() => {
    if (start === true) {
      const timer = setTimeout(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          setStart(false);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
    return;
  }, [time, start]);

  //calculate percentage: seconds left / by total amount of time x 100
  const percentage = ((time - 1) / (initialTime - 1)) * 100;
  //making a string with % from a number
  const barWidth = `${percentage}%`;

  return (
    <div className="flex h-1/2 w-full items-center pl-[28px] pr-[36px] text-[25px] text-babbleWhite">
      <MdTimer
        className={
          time === 0 && initialTime > 5
            ? "animate-ping-short text-[red]"
            : "text-babbleWhite"
        }
      />
      <div className="relative left-2 flex h-2 w-full items-center justify-center overflow-hidden rounded-full bg-babbleGray/20">
        <div
          className="transition-width absolute left-0 h-2 rounded-full rounded-r-none bg-gradient-to-r from-platformDark to-platformLight duration-1000 ease-linear"
          style={{ width: barWidth }}
        ></div>
      </div>
    </div>
  );
}

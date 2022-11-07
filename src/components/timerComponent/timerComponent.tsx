import React, { useEffect, useState } from "react";
import { MdTimer } from "react-icons/md";

type Time = {
  initialTime: number;
  questionIndex: number;
};

export default function TimerComponent({ initialTime, questionIndex }: Time) {
  let index = 0;
  console.log(index);

  //wait for questionIndex to change before starting the timer
  const [start, setStart] = useState(true);

  useEffect(() => {
    if (questionIndex !== index) {
      setStart(true);
      index = questionIndex;
      console.log("index changed");
    }
  }, [questionIndex]);

  const [time, setTime] = useState(initialTime);

  //start timer when start is true and time is greater than 0. if time is 0, stop the timer and set start to false. stop the timer from running twice
  useEffect(() => {
    if (start === true && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      setStart(false);
    } else return;
    return;
  }, [time, start]);

  //calculate percentage: seconds left / by total amount of time x 100
  const percentage = ((time - 1) / (initialTime - 1)) * 100;

  //making a string with % from a number
  const barWidth = `${percentage}%`;

  //logic for the color of the letters
  let timerColor = "white";
  time === 0 && initialTime > 5 ? (timerColor = "red") : (timerColor = "white");

  return (
    <div className="flex w-full items-center gap-2 rounded-babble bg-babbleDarkGray p-8 text-3xl text-babbleWhite">
      <MdTimer
        className={
          time === 0 && initialTime > 5
            ? "w-12 animate-ping-short text-5xl text-[red]"
            : "W-12 text-5xl text-babbleWhite"
        }
      />
      <div className="relative left-6 mr-8 flex h-10 w-full items-center justify-center overflow-hidden rounded-full bg-babbleGray/20">
        <div
          className={
            time <= 5 && time > 0 ? "z-10 animate-ping text-xl" : "z-10"
          }
          style={{
            color: timerColor,
          }}
        >
          {time}
        </div>
        <div
          className="transition-width absolute left-0 h-10 rounded-full rounded-r-none bg-gradient-to-r from-platformDark to-platformLight duration-1000 ease-linear"
          style={{ width: barWidth }}
        ></div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { MdTimer } from "react-icons/md";
import { TimeProp } from "../../types";

export default function TimerComponent({ timeProp, setTime }: TimeProp) {
  //logic for timer bar
  const time = timeProp.time;
  const initialTime = timeProp.initialTime;

  //update time every second with useEffect when bigger than 0
  useEffect(() => {
    time > 0 &&
      setTimeout(
        () =>
          setTime({
            ...timeProp,
            time: time - 1,
          }),
        1000
      );
  }, [time]);

  //calculate percentage: seconds left / by total amount of time x 100
  const percentage = (time / initialTime) * 100;

  //making a string with % from a number
  const barWidth = `${percentage}%`;

  //logic for the color of the letters
  let timerColor = "white";
  time === 0 && initialTime > 5 ? (timerColor = "red") : (timerColor = "white");
  let timerOpacity = "1";
  time > 5 ? (timerOpacity = "0") : (timerOpacity = "1");

  return (
    <div className="flex items-center gap-2 rounded-babble bg-babbleDarkGray p-8 text-3xl text-babbleWhite">
      <MdTimer
        className={
          time === 0 && initialTime > 5
            ? "animate-ping-short text-5xl text-[red]"
            : "text-5xl text-babbleWhite"
        }
      />
      <div className="relative left-6 mr-8 flex h-10 w-full items-center justify-center overflow-hidden rounded-full bg-babbleGray">
        <div
          className={
            time <= 5 && time > 0 ? "z-10 animate-ping text-xl" : "z-10"
          }
          style={{
            color: timerColor,
            opacity: timerOpacity,
          }}
        >
          {time}
        </div>
        <div
          className="absolute left-0 h-10 rounded-full rounded-r-none bg-gradient-to-r from-platformDark to-platformLight"
          style={{ width: barWidth }}
        ></div>
      </div>
    </div>
  );
}

//  this useEffect is used to update the time every second
//  it checks if the time is greater than 0 and if it is, it sets a timeout for 1 second
//  in that timeout it sets the time to the previous time minus 1
//  this is done by using the setTime function that is passed as a prop
//  the setTime function is used to update the time in the parent component
//  the time is updated by using the setTime function that is passed as a prop

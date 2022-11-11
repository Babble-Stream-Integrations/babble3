import React from "react";
import { FaPlay } from "react-icons/fa";

type Props = {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PlayPauzeComponent({ setStart }: Props) {
  return (
    <div className="flex h-full w-full items-center gap-2 rounded-babble bg-babbleDarkGray p-8 text-3xl text-babbleWhite">
      <div className="relative flex w-full items-center justify-center  ">
        <h1 className="absolute left-0 whitespace-nowrap text-[20px] font-bold">
          Start game
        </h1>
        <button onClick={() => setStart(true)} className="hover:text-platform">
          <FaPlay />
        </button>
      </div>
    </div>
  );
}

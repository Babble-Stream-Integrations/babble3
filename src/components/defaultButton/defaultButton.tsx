import React from "react";

type ButtonProps = {
  text: string;
  buttonClick: any;
  animation: string;
};

export const DefaultButton = ({
  text,
  buttonClick,
  animation,
}: ButtonProps) => {
  return (
    <button
      className={`h-[50px] min-w-[200px] cursor-pointer rounded-full bg-babbleLightGray py-[14px] px-[44px] transition duration-300 hover:opacity-80 ${animation}`}
      onClick={buttonClick}
    >
      <p className="z-10 text-xl font-bold uppercase leading-none text-babbleBlack">
        {text}
      </p>
    </button>
  );
};

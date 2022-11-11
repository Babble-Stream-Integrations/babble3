import { useState } from "react";

type ButtonProps = {
  text: string;
  buttonClick: () => void;
};

export const DefaultButton = ({ text, buttonClick }: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="h-[50px] min-w-[200px] cursor-pointer rounded-full bg-babbleLightGray py-[14px] px-[44px] transition duration-300 hover:opacity-80"
      onClick={() => {
        setLoading(true);
        buttonClick();
      }}
      disabled={loading}
    >
      <p className="z-10 text-xl font-bold uppercase leading-none text-babbleBlack">
        {loading ? "Loading..." : text}
      </p>
    </button>
  );
};

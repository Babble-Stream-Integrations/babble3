import { useState } from "react";

type ButtonProps = {
  text: string;
  buttonClick: () => void;
  simplified?: boolean;
};

export const DefaultButton = ({
  text,
  buttonClick,
  simplified = false,
}: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className={`${
        simplified
          ? "m-5 font-bold uppercase"
          : "h-[50px] min-w-[200px] cursor-pointer rounded-full bg-babbleLightGray py-[14px] px-[44px] transition duration-300 hover:opacity-80"
      }`}
      onClick={() => {
        setLoading(true);
        buttonClick();
      }}
      disabled={loading}
    >
      <p
        className={`z-10 text-xl font-bold uppercase leading-none ${
          simplified ? "text-gray-400" : "text-babbleBlack"
        }`}
      >
        {loading && !simplified ? "Loading..." : text}
      </p>
    </button>
  );
};

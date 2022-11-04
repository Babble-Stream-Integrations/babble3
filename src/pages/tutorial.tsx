import { useNavigate } from "react-router-dom";

export default function Tutorial() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-radial from-[#202024] to-[#0E0E10]">
      <div className="py pb-8 font-thin">
        <h1 className="animate-fade-in-1 pb-[25px] text-center text-5xl font-normal text-babbleWhite">
          Tutorial
        </h1>
        <p className="px-16 pb-2 text-center font-thin text-babbleWhite">
          When you start a new game, you will be shown an interface <br />
          showing both your Twitch chat and the question. <br /> Competitors may
          compete by writing in Twitch chat, <br />
          where you get points based on how fast you answer.
        </p>
        <p className="px-16 pb-2 text-center font-thin text-babbleWhite">
          Additionally, you can change the quiz colors, set the difficulty
          <br /> and category of the quiz and also enable the
          &apos;eliminations&apos; game mode
          <br /> where people get eliminated when they give incorrect answers,
        </p>
        <p className="px-16 pb-2 text-center font-thin text-babbleWhite">
          Once the game comes to a wrap, you will be shown the top 3 competitors
          <br />
          and their points.
        </p>
      </div>
      <div className="absolute bottom-[100px] items-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex rounded-full bg-babbleWhite px-12 py-2 font-bold uppercase text-babbleBlack"
        >
          Back
        </button>
      </div>
    </div>
  );
}

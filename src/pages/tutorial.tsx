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
          Whent you hit the &apos;Play Game&apos; button your chat <br />
          will be loaded in and the game can begin!
        </p>
        <p className="px-16 pb-2 text-center font-thin text-babbleWhite">
          A Series of 10 trivia questions will appear on <br />
          screen. You and your chat can answer by typing the <br />
          corresponding letter in the chatbox. Keep in <br />
          mind that you will get rewarded with points. <br />
          Answering fast and scoring combo&apos;s will give you <br />
          extra!
        </p>
        <p className="px-16 pb-2 text-center font-thin text-babbleWhite">
          When the game is over you&apos;Il be able to see how <br />
          everyone performed.
        </p>
      </div>
      <div className="absolute bottom-[200px] items-center">
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

import { useNavigate } from "react-router-dom";
import logoBig from "../assets/logo-full.png";
import QuizSettings from "../components/quizComponent/quizSettings";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className=" flex min-h-screen items-center justify-center overflow-hidden bg-gradient-radial from-[#202024] to-[#0E0E10]">
      <div className="relative z-10 flex min-h-[664px] min-w-[883px] flex-col items-center gap-4 text-center drop-shadow-xl">
        <h1 className="pb-[10px] text-4xl font-bold text-babbleWhite">
          Settings
        </h1>
        <p className="px-16 pb-[15px] text-center font-thin text-babbleGray">
          You can change these settings to make the game <br />
          more to your liking
        </p>
        <QuizSettings />
        <div className="pt-[30px]">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="rounded-xl bg-babbleLightGray px-10 py-4 text-xl font-bold uppercase text-babbleBlack"
          >
            SAVE
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 "></div>
    </div>
  );
}

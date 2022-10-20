import { useNavigate } from "react-router-dom";
import logoBig from "../assets/logo-full.png";
import QuizSettings from "../components/quizComponent/quizSettings";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className=" flex min-h-screen items-center justify-center overflow-hidden bg-babbleBlack">
      <div className="relative z-10 flex min-h-[664px] min-w-[883px] flex-col items-center gap-4 rounded-babble bg-babbleDarkGray py-[50px] text-center drop-shadow-xl">
        <h1 className="pb-[25px] text-4xl font-bold text-babbleWhite">
          Settings
        </h1>
        <QuizSettings />
        <div className="pt-[30px]">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="mr-[15px] rounded-xl bg-babbleLightGray px-10 py-4 text-xl font-bold uppercase text-babbleBlack"
          >
            SAVE
          </button>
          <button
            className="rounded-xl bg-babbleGray px-10 py-4 text-xl font-bold uppercase text-babbleBlack"
            onClick={() => console.log("clicked")}
          >
            DEFAULT
          </button>
        </div>
      </div>
      <h1 className="absolute bottom-[100px] text-babbleWhite">
        © 2022 Babble stream integrations
      </h1>
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] items-start justify-start rounded-br-full bg-gradient-to-t from-babbleYellow to-babbleRed ">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-br-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-0 bottom-0 flex h-[30rem] w-[30rem] items-end justify-end rounded-tl-full bg-gradient-to-t from-babbleLightblue to-babbleDarkblue ">
        <div className=" h-[29.2rem] w-[29.2rem] rounded-tl-full bg-babbleBlack"></div>
      </div>
      <div className="absolute right-20 top-16">
        <img src={logoBig} className="h-10"></img>
      </div>
      <div className="absolute bottom-0 "></div>
    </div>
  );
}

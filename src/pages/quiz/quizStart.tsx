import logoBig from "../../assets/logo-full.png";
import { Link, useNavigate } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";

export default function QuizStart() {
  const navigate = useNavigate();
  const [account] = useSessionStorageState("account", {
    defaultValue: {
      displayName: "",
    },
  });

  function buttonClicked() {
    navigate("/quiz");
  }

  return (
    <div className=" flex min-h-screen items-center justify-center overflow-hidden bg-babbleBlack">
      <div className="relative z-10 flex h-[404px] w-[551px] flex-col items-center justify-center gap-4 rounded-babble bg-babbleDarkGray text-center drop-shadow-xl">
        <h1 className="text-4xl font-bold text-babbleWhite">
          Hi {account.displayName},
        </h1>
        <p className="px-16 pb-2 font-thin italic text-babbleWhite">
          When the game starts you&apos;Il get a series of 10 trivia questions.
          You and your chat may answer by typing A, B, C or D in chat.
        </p>
        <p className="px-16 pb-2 font-thin italic text-babbleWhite">
          Good luck, and have fun!
        </p>
        <button
          onClick={() => {
            buttonClicked();
          }}
          className="text-l flex items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-babbleYellow to-babbleRed px-12 py-2 font-bold uppercase text-babbleDarkGray hover:from-babbleOrange hover:to-babbleRed"
        >
          Start Game
        </button>
        <Link
          to={"/"}
          className="absolute bottom-[-50px] flex text-babbleWhite"
        >
          Go back to home
        </Link>
      </div>
      <h2 className="absolute bottom-[100px] text-babbleWhite">
        © 2022 Babble stream integrations
      </h2>
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

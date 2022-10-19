import logoBig from "../assets/logo-full.png";
import { FaPlay, FaGraduationCap, FaCaretDown } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  //need setSession to get removeItem to work
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [session, setSession, { removeItem }] = useSessionStorageState(
    "account",
    {
      defaultValue: {
        username: "",
        avatar: "",
      },
    }
  );

  const [menuOpen, setMenuOpen] = useState(false);

  //define different sign in methods
  const buttonOptions = [
    {
      name: "play game",
      icon: <FaPlay size={25} />,
      nav: "quizstart",
    },
    {
      name: "tutorial",
      icon: <FaGraduationCap size={30} />,
      nav: "tutorial",
    },
    {
      name: "Settings",
      icon: <MdSettings size={30} />,
      nav: "settings",
    },
  ];

  function buttonClicked(nav: string) {
    navigate(nav);
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-radial from-[#2D2D31] via-[#1A1A1D] to-[#1A1A1D]">
      <div className="py pb-8 font-thin">
        <h1 className="animate-fade-in-1 pb-[25px] text-center text-5xl font-normal text-babbleWhite">
          Main menu
        </h1>
        <div className="flex animate-fade-in-1 items-center justify-center gap-4 py-2 text-[#A8A8A8]">
          <img src={session.avatar} className="h-10 w-10 rounded-full" alt="" />
          <h1 className="pl-[10px] text-xl text-[#A8A8A8]">
            {session.username}
          </h1>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaCaretDown
                size={30}
                className="rotate-180 transform transition"
              />
            ) : (
              <FaCaretDown size={30} className="transform transition" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="flex flex-col items-start">
            <button onClick={() => removeItem()}>
              <h1 className="text-xl italic text-[#A8A8A8] underline underline-offset-4">
                Sign out
              </h1>
            </button>
          </div>
        )}
        <div className="flex flex-col gap-[25px] py-[25px]">
          {buttonOptions.map((options, index) => {
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="option"
                  className="peer hidden"
                  onChange={() => buttonClicked(options.nav)}
                />
                <div className="group relative flex h-[70px] w-[300px] items-center justify-center rounded-babble border-2  border-[#A8A8A8] text-[#A8A8A8] hover:border-babbleOrange hover:text-babbleWhite ">
                  <div className="z-10 pl-4">{options.icon}</div>
                  <div className=" z-10 flex w-full justify-center text-xl font-bold">
                    <h1>{options.name}</h1>
                  </div>
                  <div
                    className={`absolute inset-0 z-0 h-full w-full bg-gradient-to-tr from-babbleOrange/10 to-babbleOrange/30  opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
                  />
                </div>
              </label>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-[75px] flex w-screen flex-col items-center">
        <img src={logoBig} className="w-[121px] pb-4"></img>
        <h1 className=" font-thin text-babbleGray">
          © 2022 Babble stream integrations
        </h1>
      </div>
    </div>
  );
}

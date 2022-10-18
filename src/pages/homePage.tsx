import logoBig from "../assets/logo-full.png";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { Streamer } from "../types";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [streamer, setStreamer] = useLocalStorageState<Streamer>("streamer", {
    defaultValue: {
      name: "ESL_CSGO",
      id: "56951019",
    },
  });
  const [platform, setPlatform] = useState("");

  const handleChange = (e: { target: { name: unknown; value: string } }) => {
    setStreamer({ ...streamer, name: e.target.value });
  };

  function buttonClicked(platform: string) {
    navigate("/quizStart", { state: { streamer: streamer, platform } });
  }

  //define different sign in methods
  const signinOptions = [
    {
      name: "Twitch",
      icon: <ImTwitch size={50} />,
    },
    {
      name: "Youtube",
      icon: <ImYoutube size={50} />,
    },
    {
      name: "TikTok",
      icon: <IoLogoTiktok size={50} />,
    },
  ];

  return (
    <div className="flex min-h-screen w-screen items-center bg-gradient-radial from-[#2D2D31] via-[#1A1A1D] to-[#1A1A1D]">
      <div className="py pb-8 pl-[140px] font-thin">
        <h1 className="pb-[25px] text-5xl font-normal text-babbleWhite">
          Welcome,
        </h1>
        <div className=" flex">
          <h1 className="text-xl text-babbleGray">select your&nbsp;</h1>
          <h1 className="pb-[50px] text-xl text-babbleLightGray">
            streaming platform
          </h1>
        </div>
        <div className="flex items-center">
          <div className="h-[2px] w-[8px] rounded-full bg-babbleLightGray" />
          <div className="h-[1px] w-full rounded-full bg-babbleGray" />
          <div className="h-[2px] w-[8px] rounded-full bg-babbleLightGray" />
        </div>
        <div className="flex gap-[50px] py-[50px] ">
          {signinOptions.map((option, index) => {
            const name = option.name.toLowerCase();
            console.log(index);
            return (
              <label key={option.name}>
                <input
                  type="radio"
                  name="option"
                  className="peer hidden"
                  onChange={() => setPlatform(name)}
                />
                <div
                  className={`relative flex h-[200px] w-[200px] animate-fade-in-${index} items-center justify-center gap-2 overflow-hidden rounded-babble border border-babbleGray text-babbleGray transition duration-500 hover:bg-gradient-to-tr hover:border-${name} hover:text-white hover:from-${name}Dark/10 hover:to-${name}Light/30 peer-checked:border-2 peer-checked:border-${name} peer-checked:bg-gradient-to-tr peer-checked:from-${name}Dark/10 peer-checked:to-${name}Light/30 peer-checked:text-babbleLightGray`}
                >
                  <div
                    className={`absolute inset-0 h-full w-full bg-gradient-to-tr from-${name}Dark/10 to-${name}Light/30  opacity-0 transition duration-300 hover:opacity-100`}
                  />
                  <div className="z-10 flex items-center justify-center">
                    {option.icon}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        <div className="mb-[50px] flex items-center">
          <div className="h-[2px] w-[8px] rounded-full bg-babbleLightGray" />
          <div className="h-[1px] w-full rounded-full bg-babbleGray" />
          <div className="h-[2px] w-[8px] rounded-full bg-babbleLightGray" />
        </div>
        <h1 className="w-[600px] text-xl text-babbleGray">
          You will be asked to verify your account with us. After that you wel
          be redirected to this site.
        </h1>
        <button
          onClick={() => {
            buttonClicked(platform);
            console.log(platform);
          }}
          className="mt-[75px] w-[200px] rounded-xl bg-babbleLightGray py-4"
        >
          <h1 className="z-10 text-xl font-bold text-babbleBlack">CONTINUE</h1>
        </button>
      </div>
      <div className="absolute bottom-[75px] flex w-screen flex-col items-center">
        <img src={logoBig} className="w-[121px] pb-4"></img>
        <h1 className=" font-thin text-babbleGray">
          © 2022 Babble stream integrations
        </h1>
      </div>
      <input
        type="text"
        className="absolute bottom-0 left-0 right-0 m-auto w-[200px] border-2 border-babbleRed bg-babbleBlack text-center text-babbleWhite"
        value={streamer.name}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

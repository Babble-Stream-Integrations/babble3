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
        <div className="flex gap-[50px] py-[50px]">
          <button
            onFocus={() => setPlatform("youtube")}
            className="flex h-[200px] w-[200px] items-center justify-center gap-2 rounded-babble border border-babbleGray text-babbleGray hover:bg-gradient-to-tr hover:from-youtubeDark/10 hover:to-youtubeLight/30 focus:border-2 focus:border-youtube focus:bg-gradient-to-tr focus:from-youtubeDark/10 focus:to-youtubeLight/30 focus:text-babbleLightGray "
          >
            <ImYoutube className="text-[50px]" />
          </button>
          <button
            onFocus={() => setPlatform("twitch")}
            className="flex h-[200px] w-[200px] items-center justify-center gap-2 rounded-babble border border-babbleGray text-babbleGray hover:bg-gradient-to-tr hover:from-twitchDark/10 hover:to-twitchLight/30 focus:border-2 focus:border-twitch focus:bg-gradient-to-tr focus:from-twitchDark/10 focus:to-twitchLight/30 focus:text-babbleLightGray"
          >
            <ImTwitch className="text-[50px]" />
          </button>
          <button
            onFocus={() => setPlatform("tiktok")}
            className="flex h-[200px] w-[200px] items-center justify-center gap-2 rounded-babble border border-babbleGray text-babbleGray hover:bg-gradient-to-tr hover:from-[#69C9D0]/10 hover:to-[#EE1D52]/30 focus:border-2 focus:border-[#EE1D52] focus:bg-gradient-to-tr focus:from-[#69C9D0]/10 focus:to-[#EE1D52]/30 focus:text-babbleLightGray"
          >
            <IoLogoTiktok className="text-[50px]" />
          </button>
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

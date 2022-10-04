import React, { useState } from "react";
import logoBig from "../assets/logo-full.png";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Streamer } from "../types";

export default function Login() {
  const navigate = useNavigate();
  const [streamer, setStreamer] = useState<Streamer>({
    name: "ESL_CSGO",
    id: "56951019",
  });

  const handleChange = (e: { target: { name: unknown; value: string } }) => {
    setStreamer({ ...streamer, name: e.target.value });
  };

  function ButtonClicked(platform: string) {
    navigate("/quizStart", { state: { streamer: streamer, platform } });
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-babbleBlack">
      <div className=" z-10 flex h-[404px] w-[551px]  flex-col items-center justify-center gap-4 rounded-babble bg-babbleGray drop-shadow-xl">
        <h1 className=" py pb-8 text-4xl font-bold text-babbleWhite">
          Select platform
        </h1>
        <button
          onClick={() => {
            ButtonClicked("youtube");
          }}
          className="text-l flex h-[45px] w-[350px] items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-youtubeDark to-youtubeLight font-[900] uppercase text-babbleWhite hover:to-youtubeDark"
        >
          <ImYoutube />
          Connect to Youtube
        </button>
        <button
          onClick={() => {
            ButtonClicked("twitch");
          }}
          className="text-l flex h-[45px] w-[350px] items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-twitchDark to-twitchLight font-bold uppercase text-babbleWhite hover:to-twitchDark"
        >
          <ImTwitch />
          Connect to Twitch
        </button>
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
      <div className="absolute bottom-0 ">
        <input
          type="text"
          className="border-2 border-babbleRed bg-babbleBlack text-center text-babbleWhite"
          value={streamer.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}

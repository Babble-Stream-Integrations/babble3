import React, { useState } from "react";
import logoBig from "../assets/logo-full.png";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Streamer } from "../types";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

export default function Login() {
  const auth = getAuth();

  const provider = new OAuthProvider("oidc.twitch");

  const [authing, setAuthing] = useState(false);
  const navigate = useNavigate();

  async function SignInWithTwitch() {
    if (new URLSearchParams(window.location.search).has("code")) {
      fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: "lp5z7l78vdolqfi1c4jv6u68fzx4dx",
          client_secret: "6r75956e0hq509t0fatlerwa7vqrvd",
          code: new URLSearchParams(window.location.search)
            .get("code")!
            .toString(),
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000/",
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          fetch("https://api.twitch.tv/helix/users", {
            method: "GET",
            headers: {
              authorization: "Bearer " + data.access_token,
              "client-id": "lp5z7l78vdolqfi1c4jv6u68fzx4dx",
            },
          })
            .then((data) => {
              return data.json();
            })
            .then((data) => {
              navigate("/quizstart", {
                state: {
                  streamer: data.data[0].display_name,
                  platform: "twitch",
                },
              });
            });
        });
    } else {
      window.open(
        "https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=lp5z7l78vdolqfi1c4jv6u68fzx4dx&redirect_uri=http://localhost:3000/&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671"
      );
    }
  }

  async function SignInWithGoogle() {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        console.log(result);
        navigate("/quizstart", {
          state: { streamer: result.user.displayName, platform: "youtube" },
        });
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  }

  const [streamer, setStreamer] = useState<Streamer>({
    name: "ESL_CSGO",
    id: "56951019",
  });

  const handleChange = (e: { target: { name: unknown; value: string } }) => {
    setStreamer({ ...streamer, name: e.target.value });
  };

  // function buttonClicked(platform: string) {
  //   navigate("/quizStart", { state: { streamer: streamer, platform } });
  // }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-babbleBlack">
      <div className=" z-10 flex h-[404px] w-[551px]  flex-col items-center justify-center gap-4 rounded-babble bg-babbleGray drop-shadow-xl">
        <h1 className=" py pb-8 text-4xl font-bold text-babbleWhite">
          Select platform
        </h1>
        <button
          onClick={() => {
            SignInWithGoogle();
          }}
          disabled={authing}
          className="text-l flex h-[45px] w-[350px] items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-youtubeDark to-youtubeLight font-[900] uppercase text-babbleWhite hover:to-youtubeDark"
        >
          <ImYoutube />
          Connect to Youtube
        </button>
        <button
          onClick={() => {
            SignInWithTwitch();
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

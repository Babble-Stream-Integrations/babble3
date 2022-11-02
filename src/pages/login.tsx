import { ImTwitch, ImYoutube } from "react-icons/im";
//import { IoLogoTiktok } from "react-icons/io5";
import { useState } from "react";
import { DefaultButton } from "../components/defaultButton/defaultButton";

export default function Login() {
  const [platform, setPlatform] = useState("");

  function buttonClicked(platform: string) {
    const url =
      platform === "twitch"
        ? "https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=rjf69e4qdu8x8gjl09mf8i6yjiv7ri&redirect_uri=https://europe-west1-babble-d6ef3.cloudfunctions.net/default/oauth2/callback/twitch&scope=user_read"
        : "https://youtube.com";
    window.location.href = url;
  }

  //define different sign in methods
  const signinOptions = [
    {
      platform: "youtube",
      icon: <ImYoutube size={50} />,
    },
    {
      platform: "twitch",
      icon: <ImTwitch size={50} />,
    },
    //    {
    //      platform: "tiktok",
    //      icon: <IoLogoTiktok size={50} />,
    //    },
  ];

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-radial from-[#202024] to-[#0E0E10]">
      <div className="flex flex-col items-center justify-center py-8 font-thin">
        <h1 className="mb-[25px] animate-fade-in-up-0 text-center text-5xl font-normal text-babbleWhite ">
          Welcome
        </h1>
        <div className="flex animate-fade-in-up-1">
          <p className="text-center text-xl text-babbleGray">
            Select your main&nbsp;
          </p>
          <p className="text-xl text-babbleLightGray">streaming platform</p>
        </div>
        <div className="flex gap-[50px] py-[50px]">
          {signinOptions.map((options) => {
            const platform = options.platform;
            return (
              <label key={options.platform}>
                <input
                  type="radio"
                  name="option"
                  className="peer hidden"
                  onChange={() => setPlatform(platform)}
                />
                <div
                  className={`group relative flex h-[200px] w-[200px] animate-fade-in-up-2 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-babble border border-babbleGray bg-babbleGray/5 text-babbleGray shadow-babble transition duration-300 hover:overflow-hidden hover:border-${platform} hover:bg-gradient-to-br hover:text-white peer-checked:border-2 peer-checked:border-${platform} peer-checked:bg-gradient-to-br peer-checked:from-${platform}Light/30 peer-checked:to-${platform}Dark/10 peer-checked:text-babbleLightGray`}
                >
                  <div
                    className={`absolute inset-0 h-full w-full bg-gradient-to-br shadow-babble from-${platform}Light/30 to-${platform}Dark/10 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
                  />
                  <div
                    className={`z-10 flex items-center justify-center [filter:_drop-shadow(3px_2px_4px_rgb(0,0,0,40%));]`}
                  >
                    {options.icon}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        <p className="w-[600px] animate-fade-in-up-3 text-center text-xl text-babbleGray">
          You will be asked to verify your account. After which you <br /> will
          be redirected back to us.
        </p>
        <div className="py-[75px]">
          <DefaultButton
            text="Continue"
            buttonClick={() => buttonClicked(platform)}
            animation="animate-fade-in-up-4"
          />
        </div>
      </div>
    </div>
  );
}

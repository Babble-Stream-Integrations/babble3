import { ImTwitch, ImYoutube } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import { useState } from "react";
import FooterComponent from "../components/footerComponent/footerComponent";

export default function Login() {
  const [platform, setPlatform] = useState("");

  function buttonClicked(platform: string) {
    const url = `https://europe-west1-babble-d6ef3.cloudfunctions.net/default/oauth2/redirection/${platform}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.url;
      });
  }

  //define different sign in methods
  const signinOptions = [
    {
      platform: "twitch",
      icon: <ImTwitch size={50} />,
    },
    {
      platform: "youtube",
      icon: <ImYoutube size={50} />,
    },
    {
      platform: "tiktok",
      icon: <IoLogoTiktok size={50} />,
    },
  ];

  return (
    <div className="flex min-h-screen w-screen items-center bg-gradient-radial from-[#2D2D31] via-[#1A1A1D] to-[#1A1A1D]">
      <div className="py-8 pl-[140px] font-thin">
        <h1 className="mb-[25px] animate-fade-in-text-0 text-5xl font-normal text-babbleWhite">
          Welcome,
        </h1>
        <div className="flex animate-fade-in-text-1">
          <p className="text-xl text-babbleGray">select your&nbsp;</p>
          <p className="mb-[50px] text-xl text-babbleLightGray">
            streaming platform
          </p>
        </div>
        <div className="flex items-center">
          <div className="h-[2px] w-[8px] rounded-full bg-babbleLightGray" />
          <div className="h-[1px] w-full rounded-full bg-babbleGray" />
          <div className="h-[2px] w-[8px] rounded-full bg-babbleLightGray" />
        </div>
        <div className="flex gap-[50px] py-[50px]">
          {signinOptions.map((options, index) => {
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
                  className={`relative flex h-[200px] w-[200px] animate-fade-in-${index} items-center justify-center gap-2 overflow-hidden rounded-babble border border-babbleGray text-babbleGray transition duration-300 hover:bg-gradient-to-tr hover:border-${platform} hover:text-white hover:from-${platform}Dark/10 hover:to-${platform}Light/30 peer-checked:border-2 peer-checked:border-${platform} peer-checked:bg-gradient-to-tr peer-checked:from-${platform}Dark/10 peer-checked:to-${platform}Light/30 peer-checked:text-babbleLightGray`}
                >
                  <div
                    className={`absolute inset-0 h-full w-full bg-gradient-to-tr from-${platform}Dark/10 to-${platform}Light/30  opacity-0 transition duration-300 hover:opacity-100`}
                  />
                  <div className="z-10 flex items-center justify-center">
                    {options.icon}
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
        <h1 className="w-[600px] animate-fade-in-text-2 text-xl text-babbleGray">
          You will be asked to verify your account with us. After that you will
          be redirected to this site.
        </h1>
        <div>
          <button
            onClick={() => {
              buttonClicked(platform);
              console.log(platform);
            }}
            className="mt-[50px] w-[200px] animate-fade-in-text-3 rounded-xl bg-babbleLightGray py-4 transition duration-300 hover:opacity-80"
          >
            <h1 className="z-10 text-xl font-bold text-babbleBlack">
              CONTINUE
            </h1>
          </button>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

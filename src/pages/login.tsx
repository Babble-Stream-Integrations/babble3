import { ImTwitch, ImYoutube } from "react-icons/im";
//import { IoLogoTiktok } from "react-icons/io5";
import { useState } from "react";
import FooterComponent from "../components/footerComponent/footerComponent";
import { DefaultButton } from "../components/defaultButton/defaultButton";

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
        <h1 className="mb-[25px] animate-fade-in-text-0 text-center text-5xl font-normal text-babbleWhite ">
          Welcome
        </h1>
        <div className="flex animate-fade-in-text-1">
          <p className="text-center text-xl text-babbleGray">
            select your main&nbsp;
          </p>
          <p className="text-xl text-babbleLightGray">streaming platform</p>
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
                  className={`group relative flex h-[200px] w-[200px] cursor-pointer shadow-babble animate-fade-in-${index} items-center justify-center gap-2 overflow-hidden rounded-babble border border-babbleGray bg-babbleGray/5 text-babbleGray transition duration-300 hover:border-${platform} hover:bg-gradient-to-br hover:text-white peer-checked:border-2 peer-checked:border-${platform} peer-checked:bg-gradient-to-br peer-checked:from-${platform}Light/30 peer-checked:to-${platform}Dark/10 peer-checked:text-babbleLightGray`}
                >
                  <div
                    className={`absolute inset-0 h-full w-full bg-gradient-to-br shadow-babble from-${platform}Light/30  to-${platform}Dark/10 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
                  />
                  <div
                    className={`z-10 flex items-center justify-center [filter:_drop-shadow(3px_2px_4px_#000000);]`}
                  >
                    {options.icon}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        <h1 className="w-[600px] animate-fade-in-text-2 text-center text-xl text-babbleGray">
          You will be asked to verify your account. After which you <br /> will
          be redirected back to us.
        </h1>
        <div className="py-[75px]">
          <DefaultButton
            text="Continue"
            buttonClick={() => buttonClicked(platform)}
            animation="animate-fade-in-text-3"
          />
        </div>
      </div>
    </div>
  );
}

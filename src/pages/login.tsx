import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { appConfig } from "config/app";
import { DefaultButton } from "default/defaultButton";

export default function Login() {
  const [platform, setPlatform] = useState("");

  function buttonClicked(platform: string) {
    if (platform === "twitch") {
      window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=rjf69e4qdu8x8gjl09mf8i6yjiv7ri&redirect_uri=${appConfig.base}/oauth2/callback/twitch&scope=user_read`;
    } else if (platform === "youtube") {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&zstate=state_parameter_passthrough_value&redirect_uri=${appConfig.base}/oauth2/callback/youtube&response_type=code&client_id=608727980458-c8dr1t3dmlo5jmpcjvh01rjjnvl8acb4.apps.googleusercontent.com`;
    } else {
      toast.error("please select an platform first");
      return;
    }
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
    // {
    //   platform: "tiktok",
    //   icon: <IoLogoTiktok size={50} />,
    // },
  ];

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        className="flex min-h-screen w-screen items-center justify-center bg-gradient-radial from-[#202024] to-[#0E0E10]"
      >
        <div className="flex flex-col items-center justify-center py-8 font-thin">
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
            }}
            transition={{
              duration: 1,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <h1 className="mb-[25px] text-center text-5xl font-normal text-babbleWhite ">
              Welcome
            </h1>
          </motion.div>
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
            }}
            transition={{
              duration: 1.25,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="flex"
          >
            <p className="text-center text-xl text-babbleGray">
              Select your main&nbsp;
            </p>
            <p className="text-xl text-babbleLightGray">streaming platform</p>
          </motion.div>
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
                  <motion.div
                    initial={{
                      y: 50,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.5,
                    }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    className={`group relative flex h-[200px] w-[200px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-babble border border-babbleGray bg-babbleLightGray/5 text-babbleGray shadow-babbleOuter hover:overflow-hidden hover:border-${platform} hover:bg-gradient-to-br hover:text-white peer-checked:border-2 peer-checked:border-${platform} peer-checked:bg-gradient-to-br peer-checked:from-${platform}Light/30 peer-checked:to-${platform}Dark/10 peer-checked:text-babbleLightGray`}
                  >
                    <div
                      className={`absolute inset-0 h-full w-full bg-gradient-to-br shadow-babble from-${platform}Light/30 to-${platform}Dark/10 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
                    />
                    <div className="z-10 flex items-center justify-center [filter:_drop-shadow(3px_2px_4px_rgb(0,0,0,40%))]">
                      {options.icon}
                    </div>
                  </motion.div>
                </label>
              );
            })}
          </div>
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
            }}
            transition={{
              duration: 1.75,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="w-[600px] text-center text-xl text-babbleGray">
              You will be asked to verify your account. After which you <br />{" "}
              will be redirected back to us.
            </p>
          </motion.div>
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
            }}
            transition={{
              duration: 2,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="py-[75px]"
          >
            <DefaultButton
              text="Continue"
              buttonClick={() => buttonClicked(platform)}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

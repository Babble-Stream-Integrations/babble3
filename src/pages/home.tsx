import { FaPlay, FaGraduationCap, FaCaretDown } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";
import { useState } from "react";
import { motion } from "framer-motion";

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
        babbleToken: "",
      },
    }
  );

  const [menuOpen, setMenuOpen] = useState(false);

  //define different sign in methods
  const buttonOptions = [
    {
      name: "Play game",
      icon: <FaPlay size={25} />,
      nav: "quiz",
    },
    {
      name: "Tutorial",
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

  function signOut() {
    // fetch(
    //   "http://localhost:5001/babble-d6ef3/europe-west1/default/oauth2/logout",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Babble ${session.babbleToken}`,
    //     },
    //     body: JSON.stringify(session.babbleToken),
    //   }
    // );
    removeItem();
    navigate("/login");
  }

  return (
    <div className=" overflow-hidden">
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
        <div className="py pb-8 font-thin">
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
            <h1 className="pb-[25px] text-center text-5xl font-normal text-babbleWhite">
              Main menu
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
            className="flex items-center justify-center gap-4 py-2 pb-[25px] text-[#A8A8A8]"
          >
            <img
              src={session.avatar}
              className="h-10 w-10 rounded-full shadow-babble"
              alt=""
            />
            <p className="pl-[10px] text-xl text-[#A8A8A8]">
              {session.username}
            </p>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaCaretDown
                  size={30}
                  className="transform transition duration-500"
                />
              ) : (
                <FaCaretDown
                  size={30}
                  className="rotate-90 transform transition duration-500"
                />
              )}
            </button>
          </motion.div>
          {menuOpen && (
            <div className="flex flex-col items-center">
              <button onClick={() => signOut()}>
                <p className="text-xl italic text-[#A8A8A8] underline underline-offset-4">
                  Sign out
                </p>
              </button>
            </div>
          )}
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
            className="flex flex-col gap-[25px] py-[25px]"
          >
            {buttonOptions.map((options, index) => {
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="option"
                    className="peer hidden"
                    onChange={() => buttonClicked(options.nav)}
                  />
                  <div className="group relative flex h-[80px] w-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-babble border border-[#A8A8A8] bg-babbleLightGray/5 text-white shadow-babbleOuter hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite">
                    <div className="z-10 pl-8">{options.icon}</div>
                    <div className="z-10 flex w-full justify-center text-xl">
                      <p>{options.name}</p>
                    </div>
                    <div
                      className={`absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
                    />
                  </div>
                </label>
              );
            })}
          </motion.div>
          <div className="flex justify-center pt-[25px] text-babbleGray">
            <p>ALPHA V1.0</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

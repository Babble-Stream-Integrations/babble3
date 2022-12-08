import { FaPlay, FaGraduationCap, FaCaretDown } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [session, setSession, { removeItem }] = useSessionStorageState(
    "account",
    {
      defaultValue: {
        avatar: "",
        babbleToken: "",
        displayName: "",
        email: "",
        platform: "",
        uid: "",
        username: "",
      },
    }
  );

  const [menuOpen, setMenuOpen] = useState(false);

  //define different sign in methods
  const buttonOptions = [
    {
      name: "Play Game",
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
    setSession({
      avatar: "",
      babbleToken: "",
      displayName: "",
      email: "",
      platform: "",
      uid: "",
      username: "",
    });
    removeItem();
    navigate("/login");
    toast.success("Signed out");
  }

  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const item = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="font-thin">
      <div className="flex items-center justify-center gap-2 text-[#A8A8A8]">
        <img
          src={session.avatar}
          className="h-10 w-10 rounded-full shadow-babble"
          alt=""
        />
        <p className="pl-[5px] text-xl text-[#A8A8A8]">{session.username}</p>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FaCaretDown
              size={30}
              className="rotate-180 transform transition duration-700"
              aria-label="Close menu"
            />
          ) : (
            <FaCaretDown
              size={30}
              className="transform transition duration-700"
              aria-label="Open menu"
            />
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="flex flex-col items-center">
          <button onClick={() => signOut()}>
            <p className="mt-2 text-xl text-[#A8A8A8] hover:text-babbleWhite">
              Sign out
            </p>
          </button>
        </div>
      )}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        className="mt-12 flex flex-col gap-[25px]"
      >
        {buttonOptions.map((options, index) => {
          return (
            <motion.div variants={item} key={index}>
              <label>
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
            </motion.div>
          );
        })}
        <div className="mt-5 flex justify-center text-babbleGray">
          <p>ALPHA V1.0</p>

          <span className="mx-5">|</span>

          <button className="underline" onClick={() => navigate("/feedback")}>
            Feedback
          </button>
        </div>
      </motion.div>
    </div>
  );
}

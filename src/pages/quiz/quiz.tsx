import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import useSessionStorageState from "use-session-storage-state";
import { FaCog, FaHome, FaPencilAlt, FaPlay, FaRedo } from "react-icons/fa";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { quizLayout } from "./quizLayout";
import { motion } from "framer-motion";
import { QuizBackend, TriviaSettings } from "../../types";
import "./quiz.css";
import toast from "react-hot-toast";
import ResolvableToast from "../../components/toasts/resolvableToast";
import { io, Socket } from "socket.io-client";
import { appConfig } from "../../config/app";
import QuizLogic from "./quizLogic";
import QuizGrid from "./quizGrid";
import QuitQuizToast from "./quitQuizToast";

export default function Quiz() {
  const navigate = useNavigate();

  //retrieve account from session storage
  const [account] = useSessionStorageState("account", {
    defaultValue: {
      username: "",
      platform: "",
      uid: "",
    },
  });

  //initial settings
  const [triviaSettings, setTriviaSettings] =
    useLocalStorageState<TriviaSettings>("quizSettings", {
      defaultValue: {
        channel: account.username,
        startAfter: 0.000000000001,
        questionAmount: 10,
        timePerQuestion: 15,
        timeInBetween: 5,
        eliminations: false,
        category: "General Knowledge",
        difficulty: "medium",
      },
    });

  //set channel to streamer channel (temporary, want to change to channel id?)
  setTriviaSettings((prevState) => ({
    ...prevState,
    channel: account.username,
  }));

  const [start, setStart] = useState(false);
  const [connect, setConnect] = useState(false);

  //get quiz data from back-end
  const [quiz, setQuiz] = useState<QuizBackend>({
    question: ".",
    possibilities: ["", "", "", ""],
    time: 1,
    rightAnswer: "",
    percentages: [],
    questionIndex: 0,
    announcements: {
      mostPoints: "",
      firstToGuess: "",
      mostPointsAmount: 0,
      onStreak: "",
      onStreakAmount: 0,
    },
    category: "",
    results: [],
    questionAmount: triviaSettings.questionAmount,
  });

  //WebSocket logic
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const socket = io(appConfig.backendUrl);
    setSocket(socket);
  }, []);

  function disconnect() {
    console.log("disconnecting");
    console.log(socket);
    socket?.disconnect();
    console.log(socket);
  }

  //the quizLogic function is a custom function that handles all the socket logic
  QuizLogic({
    socket,
    start,
    setConnect,
    setQuiz,
    triviaSettings,
    disconnect,
  });

  window.onpopstate = function () {
    disconnect();
  };

  const [editable, setEditable] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [layout, setLayout, { removeItem }] = useLocalStorageState(
    "quizLayout",
    {
      defaultValue: quizLayout,
    }
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="overflow-hidden"
      data-theme={account.platform}
    >
      <div className="absolute top-[50px] left-[50px] z-40 flex flex-col gap-6 text-[25px] font-[1000] uppercase text-babbleLightGray">
        {/* create menu button */}
        <button
          onClick={() => {
            toast.promise(
              new Promise<void>((resolve) => {
                //wait for socket.game-starting
                socket?.on("game-starting", () => {
                  resolve();
                });
              }),
              {
                loading: "Starting game",
                success: "Game started",
                error: "Something went wrong",
              }
            );
            setStart(true);
          }}
          className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
        >
          <FaPlay className="z-10" />
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100" />
        </button>
        <button
          onClick={() => {
            if (start) {
              QuitQuizToast({ setStart, disconnect });
            } else {
              navigate("/settings");
            }
          }}
          className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
        >
          <FaCog className="z-10" />
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100" />
        </button>
        <button
          onClick={() => {
            if (start) {
              QuitQuizToast({ setStart, disconnect });
            } else {
              disconnect();
              console.log("disconnected");
              navigate("/");
            }
          }}
          className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
        >
          <FaHome className="z-10" />
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100" />
        </button>
      </div>
      <QuizGrid
        editable={editable}
        socket={socket}
        account={account}
        quiz={quiz}
        start={start}
        streamer={account}
        connect={connect}
      />

      <div className="absolute bottom-[50px] left-[50px] z-40 flex flex-col gap-[25px] text-[25px] font-[1000]">
        {editable && !start && (
          <button
            className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
            onClick={() => {
              toast.loading(
                (t) => (
                  <ResolvableToast
                    t={t}
                    text="Are you sure you want to reset the layout?"
                    confirm="Reset layout"
                    cancel="Keep layout"
                    func={() => {
                      removeItem();
                    }}
                  />
                ),
                {
                  icon: <></>,
                  id: "reset",
                }
              );
            }}
          >
            <FaRedo className="z-10" />
            <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100" />
          </button>
        )}
        {start ? (
          <div />
        ) : (
          <button
            className={
              editable
                ? "group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border-2 border-babbleOrange bg-babbleOrange/5 bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 p-4 text-babbleWhite shadow-babbleOuter backdrop-blur-babble transition duration-300 hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite "
                : "group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-babbleGray shadow-babbleOuter backdrop-blur-babble transition duration-300 hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
            }
            onClick={() => {
              setEditable(!editable);
            }}
          >
            <FaPencilAlt className="z-10" />
            <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100" />
          </button>
        )}
        <button
          onClick={() => {
            setFullscreen(!fullscreen);
            if (fullscreen) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
          className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
        >
          {fullscreen ? (
            <BsFullscreenExit className="z-10" />
          ) : (
            <BsFullscreen className="z-10" />
          )}
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100" />
        </button>
      </div>
    </motion.div>
  );
}

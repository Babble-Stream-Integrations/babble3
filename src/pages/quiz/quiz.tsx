import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import useSessionStorageState from "use-session-storage-state";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { FaCog, FaHome, FaPencilAlt, FaPlay, FaRedo } from "react-icons/fa";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { quizLayout } from "./quizLayout";
import { motion } from "framer-motion";
import { Layout, QuizBackend, Streamer, TriviaSettings } from "../../types";
import ChatComponent from "../../components/chatComponent/chatComponent";
import QuizComponent from "../../components/quizComponent/quizComponent";
import AnnouncementFeedComponent from "../../components/announcementFeedComponent/announcementFeedComponent";
import "./quiz.css";
import toast from "react-hot-toast";
import ResolvableToast from "../../components/toasts/resolvableToast";
import clsx from "clsx";
import { MdDragIndicator } from "react-icons/md";
import { io, Socket } from "socket.io-client";
import { appConfig } from "../../config/app";

export default function Quiz() {
  const navigate = useNavigate();

  const [account] = useSessionStorageState("account", {
    defaultValue: {
      username: "",
      platform: "",
      uid: "",
    },
  });
  const streamer: Streamer = {
    channel: account.username,
    uid: account.uid,
  };

  //initial settings
  const [triviaSettings, setTriviaSettings] =
    useLocalStorageState<TriviaSettings>("quizSettings", {
      defaultValue: {
        channel: streamer.channel,
        startAfter: 0.000000000001,
        questionAmount: 10,
        timePerQuestion: 15,
        timeInBetween: 5,
        eliminations: false,
        category: "General Knowledge",
        difficulty: "medium",
      },
    });

  //set channel to streamer channel (temporary)
  setTriviaSettings((prevState) => ({
    ...prevState,
    channel: account.username,
  }));

  const [start, setStart] = useState(false);
  const [connect, setConnect] = useState(false);

  //show toast when user tries to leave page, only if quiz has started. use window.history to prevent user from going back before he has answered the toast

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

  function disConnect() {
    console.log("disconnecting");
    socket?.disconnect();
  }

  useEffect(() => {
    if (start) {
      if (!socket) return;
      //on first connection, send quiz to back-end
      socket.emit("trivia-start", triviaSettings);

      //give countdown before first question
      socket.on("game-starting", (data) => {
        setQuiz((prevState) => ({
          ...prevState,
          time: data.in,
        }));
        //confirm the connection with back-end
        setConnect(true);
      });

      //when getting a new question, update the data
      socket.on("question-new", (data) => {
        console.log(data);
        setQuiz((prevState) => ({
          ...prevState,
          question: data.question,
          possibilities: data.possibilities,
          rightAnswer: "",
          percentages: [],
          questionIndex: data.questionIndex,
          time: data.time,
        }));
      });

      //after {timePerQuestion} show the right answer and the percentages
      socket.on("question-finished", (data) => {
        console.log(data);
        setQuiz((prevState) => ({
          ...prevState,
          rightAnswer: data.rightAnswer,
          percentages: data.percentages,
          announcements: {
            mostPoints: data.mostPoints?.username ?? "",
            mostPointsAmount: data.mostPoints?.points ?? "",
            firstToGuess: data.firstToGuess,
            onStreak: data.contestantData[0]?.username ?? "",
            onStreakAmount: data.contestantData[0]?.currentStreak ?? "",
          },
        }));
      });

      //when the game is finished, show the results
      socket.on("game-finished", (data) => {
        setQuiz((prevState) => ({
          ...prevState,
          results: data.results,
        }));
        console.log(data.results);
        //wait 5 seconds before navigating to the results page
        setTimeout(() => {
          toast.dismiss();
          disConnect();
          navigate("/quizresults", {
            state: {
              results: data.results,
            },
          });
        }, 5000);
      });
    }
  }, [start]);

  //when the user tries to leave the page, show a toast to confirm the action
  //issue, when returning to this page via nav(-1), it will show the toast again.
  //temporary fix: always navigate to / from settings page (instead of -1)
  if (start) {
    window.history.pushState(null, window.location.href);
    window.onpopstate = function () {
      toast.loading(
        (t) => (
          <ResolvableToast
            t={t}
            text="Are you sure you want to quit?"
            confirm="Quit"
            cancel="Continue"
            func={() => {
              setStart(false);
              disConnect();
              history.pushState(null, "", "/");
              navigate("/");
            }}
          />
        ),
        {
          icon: <></>,
          id: "exit",
        }
      );
    };
  } else {
    window.onpopstate = function () {
      disConnect();
      history.pushState(null, "", "/");
      navigate("/");
    };
  }

  //useLocalStorageState hook to save the layout
  const [layout, setLayout, { removeItem }] = useLocalStorageState(
    "quizLayout",
    {
      defaultValue: quizLayout,
    }
  );

  const [editable, setEditable] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // update height every time the window.innerHeight changes
  const [height, setHeight] = useState(window.innerHeight - 20);
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 20);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
            toast.success("Game started");
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
              toast.loading(
                (t) => (
                  <ResolvableToast
                    t={t}
                    text="Are you sure you want to quit?"
                    confirm="Quit"
                    cancel="Continue"
                    func={() => {
                      setStart(false);
                      disConnect();
                      navigate("/settings");
                      //add this page to the history so the user can go back to it
                    }}
                  />
                ),
                {
                  icon: <></>,
                  id: "exit",
                }
              );
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
              toast.loading(
                (t) => (
                  <ResolvableToast
                    t={t}
                    text="Are you sure you want to quit?"
                    confirm="Quit"
                    cancel="Continue"
                    func={() => {
                      setStart(false);
                      disConnect();
                      navigate("/");
                    }}
                  />
                ),
                {
                  icon: <></>,
                  id: "exit",
                }
              );
            } else {
              disConnect();
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
      <ResponsiveGridLayout
        className="overflow-hidden"
        width={window.innerWidth}
        layouts={layout}
        breakpoints={{ lg: 100 }}
        cols={{ lg: 24 }}
        rowHeight={height / 12 - 52.75}
        isBounded={true}
        useCSSTransforms={true}
        // allowOverlap={true}
        compactType={"vertical"}
        resizeHandles={["se"]}
        margin={[50, 50]}
        isResizable={editable && !start}
        isDraggable={editable && !start}
        onLayoutChange={(layout: Layout[]) => {
          setLayout((prevState) => ({
            ...prevState,
            lg: layout,
          }));
        }}
      >
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
          className={clsx(
            "relative z-10 flex w-[450px] items-center justify-center ",
            editable && !start && "cursor-grab"
          )}
          key="chat-component"
        >
          {editable && !start && (
            <MdDragIndicator className="absolute inset-y-2 left-2 z-20 m-auto text-xl text-white" />
          )}
          <ChatComponent
            streamer={streamer}
            platform={account.platform}
            announcements={quiz.announcements}
            socket={socket}
          />
        </motion.div>
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
          className={clsx(
            "relative z-10 flex items-center justify-center",
            editable && !start && "cursor-grab"
          )}
          key="quiz-component"
        >
          {editable && !start && (
            <MdDragIndicator className="absolute inset-y-2 left-2 z-20 m-auto text-xl text-white" />
          )}
          <QuizComponent quiz={quiz} start={connect} />
        </motion.div>
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
          className={clsx(
            "relative z-10 flex items-center justify-center",
            editable && !start && "cursor-grab"
          )}
          key="first-to-answer"
        >
          {editable && !start && (
            <MdDragIndicator className="absolute inset-y-2 left-2 z-20 m-auto text-xl text-white" />
          )}
          <AnnouncementFeedComponent
            key="first-to-answer"
            announcements={quiz.announcements}
          />
        </motion.div>
      </ResponsiveGridLayout>
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

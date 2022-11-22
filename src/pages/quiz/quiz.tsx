import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import useLocalStorageState from "use-local-storage-state";
import ChatComponent from "../../components/chatComponent/chatComponent";
import QuizComponent from "../../components/quizComponent/quizComponent";
import { Layout, QuizBackend, Streamer, TriviaSettings } from "../../types";
import { appConfig } from "../../config/app";
import AnnouncementFeedComponent from "../../components/announcementFeedComponent/announcementFeedComponent";
import useSessionStorageState from "use-session-storage-state";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { FaCog, FaHome, FaPencilAlt, FaPlay, FaRedo } from "react-icons/fa";
import "./quiz.css";
import { quizLayout } from "./quizLayout";
import { motion } from "framer-motion";

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
        startAfter: 1,
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
  //start timer on first connection with back-end
  const [start, setStart] = useState(false);

  //get quiz data from back-end
  const [quiz, setQuiz] = useState<QuizBackend>({
    question: "Use the play button to start the game!",
    possibilities: ["Example 1", "Example 2", "Example 3", "Example 4"],
    time: 0,
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
  useEffect(() => {
    //connect with socket.io
    if (start === true) {
      const socket: Socket = io(appConfig.backendUrl);
      //on first connection, send quiz to back-end
      socket.emit("trivia-start", triviaSettings);

      //give countdown before first question
      socket.on("game-starting", (data) => {
        setQuiz((prevState) => ({
          ...prevState,
          time: data.in,
        }));
        //confirm the connection with back-end
        setStart(true);
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
            mostPoints: data.mostPoints.username,
            mostPointsAmount: data.mostPoints.points,
            firstToGuess: data.firstToGuess,
            onStreak: data.contestantData[0].username,
            onStreakAmount: data.contestantData[0].currentStreak,
          },
        }));
      });

      //when the game is finished, disconnect from the back-end
      socket.on("game-finished", (data) => {
        setQuiz((prevState) => ({
          ...prevState,
          results: data.results,
        }));
        console.log(data.results);
        //wait 5 seconds before navigating to the results page
        setTimeout(() => {
          navigate("/quizresults", {
            state: {
              results: data.results,
            },
          });
        }, 5000);
      });
    }
  }, [start]);

  const [layout, setLayout, { removeItem }] = useLocalStorageState(
    "quizLayout",
    {
      defaultValue: quizLayout,
    }
  );

  const [editable, setEditable] = useState(false);

  const height = window.innerHeight - 20;

  return (
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
      className="overflow-hidden [background:_transparent_radial-gradient(closest-side_at_50%_50%,_#202024_0%,_#0E0E10_100%)_0%_0%_no-repeat_padding-box]"
      data-theme={account.platform}
    >
      <div className="absolute top-[50px] left-[50px] z-40 flex flex-col gap-6 text-[25px] font-[1000] uppercase text-babbleLightGray">
        {/* create menu button */}
        <button
          onClick={() => {
            setStart(true);
          }}
          className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
        >
          <FaPlay className="z-10" />
          <div
            className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
          />
        </button>
        <button
          onClick={() => {
            if (start) {
              if (window.confirm("Are you sure you want to end the game?")) {
                setStart(false);
                navigate("/settings");
              }
            } else {
              navigate("/settings");
            }
          }}
          className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
        >
          <FaCog className="z-10" />
          <div
            className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
          />
        </button>
        <button
          onClick={() => {
            if (start) {
              if (window.confirm("Are you sure you want to leave?")) {
                setStart(false);
                navigate("/");
              }
            } else {
              navigate("/");
            }
          }}
          className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
        >
          <FaHome className="z-10" />
          <div
            className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
          />
        </button>
      </div>
      <ResponsiveGridLayout
        className="overflow-hidden"
        width={window.innerWidth}
        layouts={layout}
        breakpoints={{ lg: 100 }}
        cols={{ lg: 24 }}
        rowHeight={height / 12 - 52.5}
        isBounded={true}
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
        <div
          className="z-10 flex w-[450px] items-center justify-center "
          key="chat-component"
        >
          <ChatComponent
            streamer={streamer}
            platform={account.platform}
            announcements={quiz.announcements}
          />
        </div>
        <div
          className="z-10 flex w-[570px] justify-center"
          key="quiz-component"
        >
          <QuizComponent quiz={quiz} />
        </div>
        <div
          className="z-10 flex items-center justify-center"
          key="first-to-answer"
        >
          <AnnouncementFeedComponent
            key="first-to-answer"
            announcements={quiz.announcements}
          />
        </div>
      </ResponsiveGridLayout>
      <div className="absolute bottom-[50px] left-[50px] z-40 flex flex-col gap-[25px] text-[25px] font-[1000]">
        {editable && !start && (
          <button
            className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
            onClick={() => {
              removeItem();
            }}
          >
            <FaRedo className="z-10" />
            <div
              className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
            />
          </button>
        )}
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
          <div
            className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-babbleOrange/20 to-babbleOrange/0 opacity-0 transition duration-300 hover:opacity-100 group-hover:opacity-100`}
          />
        </button>
      </div>
    </motion.div>
  );
}

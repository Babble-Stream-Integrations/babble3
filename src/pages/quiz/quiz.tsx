import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import useLocalStorageState from "use-local-storage-state";
import ChatComponent from "../../components/chatComponent/chatComponent";
import QuizComponent from "../../components/quizComponent/quizComponent";
import TimerComponent from "../../components/timerComponent/timerComponent";
import { Layout, QuizBackend, Streamer, TriviaSettings } from "../../types";
import logo from "../../assets/logo-small.png";
import { appConfig } from "../../config/app";
import AnnouncementFeedComponent from "../../components/announcementFeedComponent/announcementFeedComponent";
import useSessionStorageState from "use-session-storage-state";
import ResultsComponent from "../../components/resultsComponent/resultsComponent";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FaCog, FaPencilAlt, FaPlay, FaSocks } from "react-icons/fa";
import "./quiz.css";

export default function Quiz() {
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
        startAfter: 6,
        questionAmount: 9,
        timePerQuestion: 30,
        timeInBetween: 8,
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
    question: "Type your answer in chat, just the letter!",
    possibilities: ["a", "b", "c", "d"],
    time: 0,
    rightAnswer: "",
    percentages: [],
    questionIndex: 0,
    firstToGuess: "",
    category: "",
    results: [],
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
          firstToGuess: data.firstToGuess,
        }));
      });

      //when the game is finished, disconnect from the back-end
      socket.on("game-finished", (data) => {
        setQuiz((prevState) => ({
          ...prevState,
          results: data.results,
        }));
        console.log(data.results);
        socket.disconnect();
      });
    }
  }, [start]);

  const [layout, setLayout, { removeItem }] = useLocalStorageState(
    "quizLayout",
    {
      defaultValue: {
        lg: [
          {
            i: "chat-component",
            x: 4,
            y: 0,
            w: 6,
            h: 12,
            minW: 6,
            maxW: 8,
            minH: 6,
            maxH: 12,
          },
          {
            i: "quiz-component",
            x: 12,
            y: 0,
            w: 8,
            h: 7,
            minW: 8,
            maxW: 12,
            minH: 7,
            maxH: 9,
          },
          {
            i: "timer-component",
            x: 12,
            y: 4,
            w: 8,
            h: 2,
            minW: 8,
            maxW: 12,
            minH: 2,
            maxH: 4,
          },
          {
            i: "first-to-answer",
            x: 12,
            y: 5,
            w: 8,
            h: 5,
            minW: 8,
            maxW: 12,
            minH: 5,
            maxH: 5,
          },
        ],
      },
    }
  );

  const [editable, setEditable] = useState(true);

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const height = window.innerHeight - 20;

  return (
    <div
      className="[background:_transparent_radial-gradient(closest-side_at_50%_50%,_#202024_0%,_#0E0E10_100%)_0%_0%_no-repeat_padding-box]"
      data-theme={account.platform}
    >
      <div className="absolute top-[50px] left-[50px] flex flex-col gap-4 text-[25px] font-[1000] uppercase text-babbleLightGray">
        <button
          onClick={() => {
            setStart(true);
          }}
          className=" flex h-[75px] w-[75px] items-center justify-center whitespace-nowrap rounded-babble border border-babbleGray bg-babbleDarkerGray p-4 backdrop-blur-babble"
        >
          <FaPlay />
        </button>
        <Link to="/settings">
          <button
            onClick={() => {
              setStart(false);
            }}
            className=" flex h-[75px] w-[75px] items-center justify-center whitespace-nowrap rounded-babble border border-babbleGray bg-babbleDarkerGray p-4 backdrop-blur-babble"
          >
            <FaCog />
          </button>
        </Link>
        <Link to="/">
          <button className=" flex h-[75px] w-[75px] items-center justify-center whitespace-nowrap rounded-babble border border-babbleGray bg-babbleDarkerGray p-4 backdrop-blur-babble">
            <FaSocks />
          </button>
        </Link>
      </div>
      <ResponsiveGridLayout
        layouts={layout}
        breakpoints={{ lg: 100 }}
        cols={{ lg: 24 }}
        rowHeight={height / 12 - 15}
        isBounded={true}
        compactType={"vertical"}
        resizeHandles={["se"]}
        margin={[15, 15]}
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
            announcement={[quiz.firstToGuess]}
          />
        </div>
        <div
          className="z-10 flex w-[570px] justify-center"
          key="quiz-component"
        >
          {quiz.results.length >= 1 ? (
            <ResultsComponent key="chat-component" results={quiz.results} />
          ) : (
            <QuizComponent
              questionAmount={
                triviaSettings ? triviaSettings.questionAmount : 0
              }
              question={quiz.question}
              answers={quiz.possibilities}
              rightAnswer={quiz.rightAnswer}
              percentages={quiz.percentages}
              questionIndex={quiz.questionIndex}
            />
          )}
        </div>
        {/* <div
          className="z-10 flex items-center justify-center"
          key="timer-component"
        >
          {start ? (
            <TimerComponent
              initialTime={quiz.time}
              questionIndex={quiz.questionIndex}
            />
          ) : (
            <PlayPauzeComponent key="timer-component" setStart={setStart} />
          )}
        </div> */}
        <div
          className="z-10 flex items-center justify-center"
          key="first-to-answer"
        >
          {quiz.firstToGuess ||
            (!start && (
              <AnnouncementFeedComponent
                key="first-to-answer"
                firstToGuess={quiz.firstToGuess}
              />
            ))}
        </div>
      </ResponsiveGridLayout>
      <div className="absolute left-[50px] bottom-[50px]">
        <Link to="/">
          <img src={logo} className="h-[45px] w-[45px]" alt="logo" />
        </Link>
      </div>
      <div className="absolute right-[50px] bottom-[50px] text-babbleLightGray">
        {editable && !start ? (
          <div>
            <button onClick={() => removeItem()}>reset</button>
            <FaPencilAlt
              onClick={() => {
                setEditable(!editable);
              }}
            />
          </div>
        ) : (
          <FaPencilAlt
            className="opacity-30"
            onClick={() => {
              setEditable(!editable);
            }}
          />
        )}
      </div>
    </div>
  );
}

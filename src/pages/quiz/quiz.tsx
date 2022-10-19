import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import useLocalStorageState from "use-local-storage-state";
import ChatComponent from "../../components/chatComponent/chatComponent";
import QuizComponent from "../../components/quizComponent/quizComponent";
import TimerComponent from "../../components/timerComponent/timerComponent";
import { QuizBackend, Streamer, TriviaSettings } from "../../types";
import logo from "../../assets/logo-small.png";
import { appConfig } from "../../config/app";
import AnnouncementFeedComponent from "../../components/announcementFeedComponent/announcementFeedComponent";
import PlayPauzeComponent from "../../components/playPauzeComponent/playPauzeComponent";
import useSessionStorageState from "use-session-storage-state";

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
        timePerQuestion: 12,
        timeInBetween: 8,
      },
    });

  //set channel to streamer channel (temporary)
  setTriviaSettings((prevState) => ({
    ...prevState,
    channel: account.username,
  }));
  //start timer on first connection with back-end
  const [start, setStart] = useState(false);
  const [timeState, setTimeState] = useState({
    time: 0,
    initialTime: 0,
  });

  //get quiz data from back-end
  const [quiz, setQuiz] = useState<QuizBackend>({
    question: "type your answer in chat, just the letter!",
    possibilities: [],
    time: 0,
    rightAnswer: "",
    percentages: [],
    questionIndex: 0,
    firstToAnswer: "",
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
        setTimeState((prevState) => ({
          ...prevState,
          time: data.in,
          initialTime: data.in,
        }));
        //confirm the connection with back-end
        setStart(true);
      });

      //when getting a new question, update the data
      socket.on("question-new", (data) => {
        setQuiz((prevState) => ({
          ...prevState,
          question: data.question,
          possibilities: data.possibilities,
          rightAnswer: "",
          percentages: [],
          questionIndex: data.questionIndex,
        }));
        setTimeState((prevState) => ({
          ...prevState,
          time: data.time,
          initialTime: data.time,
        }));
      });

      //after {timePerQuestion} show the right answer and the percentages
      socket.on("question-finished", (data) => {
        setQuiz((prevState) => ({
          ...prevState,
          rightAnswer: data.rightAnswer,
          percentages: data.percentages,
          firstToAnswer: data.firstToAnswer,
        }));
      });

      //when the game is finished, disconnect from the back-end
      socket.on("game-finished", () => {
        socket.disconnect();
      });
    }
  }, [start]);
  return (
    <div className="bg-babbleBlack" data-theme={account.platform}>
      <Link to="/">
        <div className="absolute top-[50px] left-[50px] h-11 w-min whitespace-nowrap rounded-full bg-white px-[30px] py-[15px] text-[18px] font-[1000] uppercase">
          <div className="flex h-full items-center justify-center">
            Quit game
          </div>
        </div>
      </Link>
      <div className="z-10 flex h-screen  flex-1 items-center justify-center gap-[50px]">
        <ChatComponent streamer={streamer} platform={account.platform} />
        <div className="z-10 flex h-full flex-col gap-[50px] py-[50px]">
          <QuizComponent
            questionAmount={triviaSettings ? triviaSettings.questionAmount : 0}
            question={quiz.question}
            answers={quiz.possibilities}
            rightAnswer={quiz.rightAnswer}
            percentages={quiz.percentages}
            questionIndex={quiz.questionIndex}
          />
          {start ? (
            <TimerComponent timeProp={timeState} setTime={setTimeState} />
          ) : (
            <PlayPauzeComponent setStart={setStart} />
          )}
          {quiz.firstToAnswer && (
            <AnnouncementFeedComponent firstToAnswer={quiz.firstToAnswer} />
          )}
        </div>
      </div>
      <div className="absolute left-[50px] bottom-[50px]">
        <Link to="/">
          <img src={logo} className="h-[45px] w-[45px]" alt="logo" />
        </Link>
      </div>
    </div>
  );
}

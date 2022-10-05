import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import ChatComponent from "../../components/chatComponent/chatComponent";
import QuizComponent from "../../components/quizComponent/quizComponent";
import TimerComponent from "../../components/timerComponent/timerComponent";
import { QuizBackend, Streamer, TriviaSettings } from "../../types";
import logo from "../../assets/logo-small.png";

export default function Quiz() {
  //connect with socket.io
  const socket: Socket = io("ws://backend-sdjmg6ndkq-ew.a.run.app");

  //get streamer quiz from previous page
  const location = useLocation();
  const streamer: Streamer = location.state.streamer;
  const platform = location.state.platform;

  //initial settings
  // TODO: link to settings page
  const [triviaSettings, setTriviaSettings] = useState<TriviaSettings>({
    streamer: streamer.name,
    startAfter: 5,
    questionAmount: 10,
    timePerQuestion: 10,
    timeInBetween: 10,
  });

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
  });

  //WebSocket logic
  useEffect(() => {
    //on first connection, send quiz to back-end
    socket.emit("trivia-start", triviaSettings);

    //give countdown before first question
    socket.on("game-starting", (quiz) => {
      console.log("Event: game-starting");
      setTimeState((prevState) => ({
        ...prevState,
        time: quiz.in,
        initialTime: quiz.in,
      }));
      //confirm the connection with back-end
      setStart(true);
    });

    //when getting a new question, update the quiz
    socket.on("question-new", (quiz) => {
      console.log("Event: question-new");
      setQuiz((prevState) => ({
        ...prevState,
        question: quiz.question,
        possibilities: quiz.possibilities,
        rightAnswer: "",
        percentages: [],
      }));
      setTimeState((prevState) => ({
        ...prevState,
        time: quiz.time,
        initialTime: quiz.time,
      }));
    });

    //after {timePerQuestion} show the right answer and the percentages
    socket.on("question-finished", (quiz) => {
      console.log("Event: question-finished");
      setQuiz((prevState) => ({
        ...prevState,
        rightAnswer: quiz.rightAnswer,
        percentages: quiz.percentages,
      }));
    });

    //when the game is finished, disconnect from the back-end
    socket.on("game-finished", () => {
      console.log("Event: game-finished");
      socket.disconnect();
    });
  }, []);

  return (
    <div className="bg-babbleBlack" data-theme={platform}>
      <Link to="/">
        <div className="absolute top-[50px] left-[50px] z-0 h-11 w-min whitespace-nowrap rounded-full bg-white px-[30px] py-[15px] text-[18px] font-[1000] uppercase">
          <div className="flex h-full items-center justify-center">
            Quit game
          </div>
        </div>
      </Link>
      <div className="z-10 flex h-screen  flex-1 items-center justify-center gap-[50px]">
        <ChatComponent streamer={streamer} platform={platform} />
        <div className="z-10 flex h-full flex-col gap-[50px] py-[50px]">
          <QuizComponent
            qAmount={triviaSettings.questionAmount}
            question={quiz.question}
            answers={quiz.possibilities}
            rightAnswer={quiz.rightAnswer}
            percentages={quiz.percentages}
          />
          {start && (
            <TimerComponent timeProp={timeState} setTime={setTimeState} />
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

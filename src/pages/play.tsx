import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import useSessionStorageState from "use-session-storage-state";
import QuizLogic from "play/quiz/quizLogic";
import QuizGrid from "play/quiz/quizGrid";
import QuizMenu from "play/quiz/quizMenu";
import { appConfig } from "config/app";
import type { QuizBackend, TriviaSettings } from "types";
import "play/quiz/quizGrid.css";
import Joyride from "components/tutorial/tutorial";
import { playSteps } from "components/tutorial/steps";

export default function Play() {
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
        channel: decodeURIComponent(account.username),
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
    channel: decodeURIComponent(account.username),
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
    socket?.disconnect();
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
      <Joyride steps={playSteps} />
      <QuizMenu
        socket={socket}
        start={start}
        setStart={setStart}
        disconnect={disconnect}
        navigate={navigate}
        editable={editable}
        setEditable={setEditable}
      />

      <QuizGrid
        editable={editable}
        socket={socket}
        account={account}
        quiz={quiz}
        start={start}
        streamer={account}
        connect={connect}
      />
    </motion.div>
  );
}

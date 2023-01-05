import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { Socket } from "socket.io-client";
import type { QuizBackend, TriviaSettings } from "types";

export default function QuizLogic({
  start,
  setConnect,
  disconnect,
  triviaSettings,
  setQuiz,
  socket,
}: {
  start: boolean;
  setConnect: (value: boolean) => void;
  disconnect: () => void;
  triviaSettings: TriviaSettings;
  setQuiz: React.Dispatch<React.SetStateAction<QuizBackend>>;
  socket?: Socket;
}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (start) {
      if (!socket) return;
      //on first connection, send quiz to back-end
      socket.emit("trivia-start", triviaSettings);

      //give countdown before first question
      socket.on("game-starting", (data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setQuiz((prevState: any) => ({
          ...prevState,
          time: data.in,
        }));
        //confirm the connection with back-end
        setConnect(true);
      });

      //when getting a new question, update the data
      socket.on("question-new", (data) => {
        console.log(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          disconnect();
          navigate("/quizresults", {
            state: {
              results: data.results,
            },
          });
        }, 5000);
      });
    }
  }, [start]);
  return;
}

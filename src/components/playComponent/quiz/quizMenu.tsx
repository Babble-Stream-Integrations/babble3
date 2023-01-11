import { useState } from "react";
import { toast } from "react-hot-toast";
import useLocalStorageState from "use-local-storage-state";
import { FaCog, FaHome, FaPlay, FaRedo, FaPencilAlt } from "react-icons/fa";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import QuitQuizToast from "toasts/quitQuizToast";
import resetLayoutToast from "toasts/resetLayoutToast";
import { quizLayout } from "./quizGridLayout";
import type { Socket } from "socket.io-client";

type QuizMenuProps = {
  socket: Socket | undefined;
  start: boolean;
  setStart: (value: boolean) => void;
  disconnect: () => void;
  navigate: (path: string) => void;
  editable: boolean;
  setEditable: (value: boolean) => void;
};
export default function QuizMenu({
  socket,
  start,
  setStart,
  disconnect,
  navigate,
  editable,
  setEditable,
}: QuizMenuProps) {
  const [fullscreen, setFullscreen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [layout, setLayout, { removeItem }] = useLocalStorageState(
    "quizLayout",
    {
      defaultValue: quizLayout,
    }
  );
  return (
    <>
      <div className="absolute top-[50px] left-[50px] z-40 flex flex-col gap-6 text-[25px] font-[1000] uppercase text-babbleLightGray">
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
              console.log("quit quiz");
              QuitQuizToast({
                setStart,
                disconnect,
                navigate,
                path: "/settings",
              });
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
              QuitQuizToast({ setStart, disconnect, navigate, path: "/" });
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
      <div className="absolute bottom-[50px] left-[50px] z-40 flex flex-col gap-[25px] text-[25px] font-[1000]">
        {editable && !start && (
          <button
            className="group relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden whitespace-nowrap rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble hover:overflow-hidden hover:border-babbleOrange hover:text-babbleWhite"
            onClick={() => {
              resetLayoutToast({ removeItem });
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
    </>
  );
}

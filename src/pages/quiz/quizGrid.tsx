import clsx from "clsx";
import type { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { MdDragIndicator } from "react-icons/md";
import useLocalStorageState from "use-local-storage-state";
import AnnouncementFeedComponent from "../../components/announcementFeedComponent/announcementFeedComponent";
import ChatComponent from "../../components/chatComponent/chatComponent";
import QuizComponent from "../../components/quizComponent/quizComponent";
import { quizLayout } from "./quizLayout";
import type { QuizBackend, Streamer } from "../../types";

export default function QuizGrid({
  editable,
  socket,
  account,
  quiz,
  start,
  connect,
}: {
  editable: boolean;
  socket?: Socket;
  account: Streamer;
  quiz: QuizBackend;
  start: boolean;
  streamer: Streamer;
  connect: boolean;
}) {
  //useLocalStorageState hook to save the layout
  const [layout, setLayout] = useLocalStorageState("quizLayout", {
    defaultValue: quizLayout,
  });

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
    <ResponsiveGridLayout
      className="overflow-hidden"
      width={window.innerWidth}
      layouts={layout}
      breakpoints={{ lg: 100 }}
      cols={{ lg: 24 }}
      rowHeight={height / 12 - 52.75}
      isBounded={true}
      useCSSTransforms={true}
      allowOverlap={true}
      maxRows={12}
      compactType={"vertical"}
      resizeHandles={["se"]}
      margin={[50, 50]}
      isResizable={editable && !start}
      isDraggable={editable && !start}
      //onDragStop does the same as onLayoutChange, but because of allowOverlap, onLayoutChange is not triggered
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      onDragStop={(layout: any) => {
        setLayout((prevState) => ({
          ...prevState,
          lg: layout,
        }));
      }}
    >
      <div
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
          streamer={account}
          announcements={quiz.announcements}
          socket={socket}
        />
      </div>
      <div
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
      </div>
      <div
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
      </div>
    </ResponsiveGridLayout>
  );
}

import React, { useState } from "react";
import TwitchChat from "./twitchChat";
import TwitchViewCount from "./twitchViewCount";
import { FaUserAlt } from "react-icons/fa";
import { ImTwitch } from "react-icons/im";
import { Message } from "../../pages/quiz";
import { Streamer } from "../../pages/quiz";

export default function ChatComponent(props: { streamer: Streamer }) {
  //usestate for chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  //usestate for viewcount
  const [viewCount, setViewCount] = useState<string>("");

  //futureproofing for youtube chat
  if (props.streamer.platform === "twitch") {
    TwitchChat({ streamer: props.streamer, messages, setMessages });
    TwitchViewCount({ streamer: props.streamer, setViewCount });
  }
  if (props.streamer.platform === "youtube") {
    TwitchChat({ streamer: props.streamer, messages, setMessages });
    TwitchChat({ streamer: props.streamer, messages, setMessages });
  }

  return (
    <div className="h-screen w-[450px] overflow-hidden rounded-[25px] py-[50px]">
      <div className="mb-[25px] h-full overflow-hidden text-ellipsis rounded-[25px] bg-babbleDarkgray text-white">
        <div className="z-40 flex h-[40px] items-center justify-between bg-gradient-to-tr from-twitchDark to-twitchLight px-[50px] font-[1000] shadow-lg shadow-babbleBlack drop-shadow-lg">
          <div className=" flex items-center justify-end gap-2 text-[18px] italic">
            <ImTwitch />{" "}
            <h1 className="text-md uppercase">{props.streamer.name}</h1>
          </div>
          <div className=" flex items-center justify-end gap-2 font-bold">
            <FaUserAlt /> <h2 className="text-md">{viewCount}</h2>
          </div>
        </div>

        <div className="relative h-full overflow-hidden pt-[50px]">
          <div className="absolute bottom-[50px] z-10">
            {/* map over messages to display a list of messages */}
            {messages.map((message, index) => {
              return (
                <div key={index} className="px-[25px]">
                  <span
                    className="break-words font-bold"
                    style={{ color: message.color }}
                    dangerouslySetInnerHTML={{ __html: message.username }}
                  />
                  :{" "}
                  <span
                    className=" break-words"
                    dangerouslySetInnerHTML={{ __html: message.message }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

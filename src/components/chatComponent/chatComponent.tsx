import React, { useState } from "react";
import TwitchChat from "./twitchChat";
import TwitchViewCount from "./twitchViewCount";
import { FaUserAlt } from "react-icons/fa";
import { Message } from "../../pages/battle";

export default function ChatComponent(props: {
  streamer: {
    name: string;
    id: string;
    platform: string;
  };
}) {
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
    <div className="w-96 overflow-hidden rounded-xl bg-babbleDarkgray pb-4">
      <div className="relative h-[90vh] w-96 overflow-hidden text-ellipsis rounded-xl bg-babbleDarkgray text-white">
        <div className="mb-2 flex justify-between bg-gradient-to-tr from-twitchDark to-twitchLight px-4 py-1 ">
          <h1 className="font-extrabold">{props.streamer.name}</h1>
          <div className=" flex items-center justify-end gap-2 font-bold">
            <FaUserAlt /> <h2 className="text-md">{viewCount}</h2>
          </div>
        </div>
        {/* map over messages to display a list of messages */}
        {messages.map((message, index) => {
          return (
            <div key={index} className="px-4">
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
  );
}

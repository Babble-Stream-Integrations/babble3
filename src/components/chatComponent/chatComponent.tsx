import React, { useState } from "react";
import TwitchChat from "./twitchChat";
import TwitchViewcount from "./twitchViewcount";

export default function ChatComponent(props: {
  streamer: {
    name: string;
    id: string;
    platform: string;
  };
}) {
  //type for chat messages
  type message = {
    username: string | undefined;
    message: string;
    color: string | undefined;
  };

  //usestate for chat messages
  const [messages, setMessages] = useState<message[]>([]);

  //usestate for viewcount
  const [viewCount, setViewCount] = useState<string>("");

  //futureproofing for youtube chat
  if (props.streamer.platform === "twitch") {
    TwitchChat({ streamer: props.streamer, messages, setMessages });
    TwitchViewcount({ streamer: props.streamer, setViewCount });
  }
  if (props.streamer.platform === "youtube") {
    TwitchChat({ streamer: props.streamer, messages, setMessages });
  }

  return (
    <div className="w-72 overflow-hidden rounded-xl bg-babbleDarkgray pb-2">
      <div className="inline-block h-[80vh] w-72 overflow-hidden text-ellipsis rounded-xl bg-babbleDarkgray text-white">
        <div className="mb-2 flex justify-between bg-gradient-to-tr from-twitchDark to-twitchLight px-4 py-1 ">
          <h1>{props.streamer.name}</h1>
          <h2>{viewCount}</h2>
        </div>
        {/* map over messages to display a list of messages */}
        {messages.map((message, index) => {
          return (
            <div key={index} className="px-4">
              <span
                className="break-words font-bold"
                style={{ color: message.color }}
              >
                {message.username}
              </span>
              :
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

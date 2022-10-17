import { useState } from "react";
import TwitchChat from "./twitchChat";
import TwitchViewCount from "./twitchViewCount";
// import YoutubeChat from "./youtubeChat.tsx";
import YoutubeViewCount from "./youtubeViewCount";
import { FaUserAlt } from "react-icons/fa";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { Message, Streamer } from "../../types";

export default function ChatComponent(props: {
  streamer: Streamer;
  platform: string;
}) {
  //usestate for chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  //usestate for viewcount
  const [viewCount, setViewCount] = useState<string>("");

  //futureproofing for youtube chat
  if (props.platform === "twitch") {
    TwitchChat({ streamer: props.streamer, messages, setMessages });
    TwitchViewCount({
      streamer: props.streamer,
      setViewCount,
    });
  }
  if (props.platform === "youtube") {
    // YoutubeChat({ liveChatId, messages, setMessages });
    YoutubeViewCount({
      streamer: props.streamer,
      setViewCount,
    });
  }

  return (
    <div className="h-screen w-[450px] overflow-hidden rounded-babble py-[50px]">
      <div className="mb-[25px] h-full overflow-hidden text-ellipsis rounded-babble bg-babbleDarkGray text-babbleWhite">
        <div className="z-40 flex h-[40px] items-center justify-between bg-gradient-to-tr from-platformDark to-platformLight px-[50px] font-[1000] shadow-lg shadow-babbleBlack drop-shadow-lg">
          <div className=" flex items-center justify-end gap-2 text-[18px] italic">
            {props.platform === "twitch" ? <ImTwitch /> : <ImYoutube />}
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
                    className="break-all font-bold"
                    style={{ color: message.color }}
                    dangerouslySetInnerHTML={{ __html: message.username }}
                  />
                  :{" "}
                  <span
                    className=" break-all "
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

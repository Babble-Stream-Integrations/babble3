import { useState } from "react";
import TwitchChat from "./twitchChat";
import TwitchViewCount from "./twitchViewCount";
// import YoutubeChat from "./youtubeChat.tsx";
import YoutubeViewCount from "./youtubeViewCount";
import { FaUserAlt } from "react-icons/fa";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import { Message, Streamer } from "../../types";

export default function ChatComponent(props: {
  streamer: Streamer;
  platform: string;
}) {
  //usestate for chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  //usestate for viewcount
  const [viewCount, setViewCount] = useState<string>("");

  const Icon = () => {
    switch (props.platform) {
      case "twitch":
        return <ImTwitch />;
      case "youtube":
        return <ImYoutube />;
      case "tiktok":
        return <IoLogoTiktok />;
      default:
        return <ImTwitch />;
    }
  };

  //futureproofing for youtube chat
  if (props.platform === "twitch") {
    TwitchChat({ streamer: props.streamer, messages, setMessages });
    TwitchViewCount({
      streamer: props.streamer,
      setViewCount,
    });
  } else if (props.platform === "youtube") {
    // YoutubeChat({ liveChatId, messages, setMessages });
    YoutubeViewCount({
      streamer: props.streamer,
      setViewCount,
    });
  } else if (props.platform === "tiktok") {
    TwitchChat({ streamer: props.streamer, messages, setMessages });
    TwitchViewCount({
      streamer: props.streamer,
      setViewCount,
    });
  }

  return (
    <div className="z-10 h-full w-[450px] overflow-hidden rounded-babble">
      <div className="mb-[25px] h-full overflow-hidden text-ellipsis rounded-babble bg-babbleDarkGray text-babbleWhite">
        <div className="z-40 flex h-[40px] items-center justify-between bg-gradient-to-tr from-platformDark to-platformLight px-[50px]">
          <div className="relative flex items-center justify-end gap-2 text-[18px] italic">
            <Icon />
            <h1 className="text-md uppercase">{props.streamer.channel}</h1>
          </div>
          <div className=" flex items-center justify-end gap-2 font-bold">
            <FaUserAlt /> <h2 className="text-md">{viewCount}</h2>
          </div>
        </div>
        <div className=" absolute z-40 h-5 w-full bg-gradient-to-t from-babbleDarkGray/10 to-babbleBlack/100 " />

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

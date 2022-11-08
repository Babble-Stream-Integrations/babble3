import { useState } from "react";
import TwitchChat from "./twitchChat";
import TwitchViewCount from "./twitchViewCount";
// import YoutubeChat from "./youtubeChat.tsx";
import YoutubeViewCount from "./youtubeViewCount";
import { FaUserAlt } from "react-icons/fa";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import { Message, Streamer } from "../../types";
import hexToHSLGradient from "../quizComponent/hexToHSLGradient";

export default function ChatComponent(props: {
  streamer: Streamer;
  platform: string;
  announcement: string[];
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

  function color(name: string, streamer: string, announcement: string[]) {
    if (name === streamer) {
      return hexToHSLGradient("#FDC74C", "right", "1", "darker");
    } else if (
      //map over announcement array and check if name is in array
      announcement
        .map((item) => item.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      return hexToHSLGradient("#FDC74C", "right", "1", "darker");
    } else {
      return "linear-gradient(to right, hsl(0, 0%, 0%) , 1%, hsl(0, 0%, 0%)";
    }
  }

  return (
    <div className="z-10 h-full w-[450px] overflow-hidden rounded-babble border border-babbleGray p-4 text-babbleWhite ">
      <div className="z-40 flex h-[40px] items-center justify-between rounded-[15px] bg-gradient-to-tr from-platformDark to-platformLight px-[50px] ">
        <div className="relative flex items-center justify-end gap-2 text-[18px] italic">
          <Icon />
          <h1 className="text-md uppercase">{props.streamer.channel}</h1>
        </div>
        <div className=" flex items-center justify-end gap-2 font-bold">
          <FaUserAlt /> <h2 className="text-md">{viewCount}</h2>
        </div>
      </div>

      <div className="relative h-full overflow-hidden pt-[50px]">
        <div className="absolute bottom-[50px] z-10">
          {messages.map((message, index) => {
            const bg = color(
              message.username,
              props.streamer.channel,
              props.announcement
            );
            return (
              <div
                key={index}
                className="my-4 w-fit rounded-[15px] py-1 px-4 "
                style={{
                  backgroundImage: bg,
                  //if color is black show message in white
                  color: bg === "black" ? message.color : "babbleWhite",
                }}
              >
                <span
                  className="w-full font-bold"
                  dangerouslySetInnerHTML={{ __html: message.displayname }}
                />
                :{" "}
                <span
                  className="w-full text-babbleWhite"
                  dangerouslySetInnerHTML={{ __html: message.message }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
import { AutoTextSize } from "auto-text-size";

export default function ChatComponent({
  streamer,
  platform,
  announcement,
}: {
  streamer: Streamer;
  platform: string;
  announcement: string[];
  messages?: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  //usestate for chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  //usestate for viewcount
  const [viewCount, setViewCount] = useState<string>("");

  const Icon = () => {
    switch (platform) {
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
  if (platform === "twitch") {
    TwitchChat({ streamer: streamer, messages, setMessages });
    TwitchViewCount({
      streamer: streamer,
      setViewCount,
    });
  } else if (platform === "youtube") {
    // YoutubeChat({ liveChatId, messages, setMessages });
    YoutubeViewCount({
      streamer: streamer,
      setViewCount,
    });
  } else if (platform === "tiktok") {
    TwitchChat({ streamer: streamer, messages, setMessages });
    TwitchViewCount({
      streamer: streamer,
      setViewCount,
    });
  }

  function color(name: string, streamer: string, announcement: string[]) {
    if (name === streamer) {
      return hexToHSLGradient("#FDC74C", "right", "1", "darker");
    } else if (
      //map over announcement array and check if name is in array
      announcement.length > 0 &&
      announcement.map((announcement) => announcement).includes(name)
    ) {
      return hexToHSLGradient("#FDC74C", "right", "1", "darker");
    } else {
      return "linear-gradient(to right, hsl(0, 0%, 0%) , 1%, hsl(0, 0%, 0%)";
    }
  }

  return (
    <div className="z-10 h-full w-full overflow-hidden rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-white shadow-babbleOuter backdrop-blur-babble">
      <div className="z-40 flex h-[50px] items-center justify-between rounded-babbleSmall bg-gradient-to-tr from-platformDark to-platformLight px-[12%] ">
        <div className="relative flex items-center justify-end gap-0.5 text-[18px] font-normal uppercase">
          <Icon />
          <div className="w-max pl-2 pr-4 text-left">
            <AutoTextSize
              dangerouslySetInnerHTML={{ __html: streamer.channel }}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 font-bold">
          <FaUserAlt />{" "}
          <h2 className="text-md">
            {new Intl.NumberFormat("en", { notation: "compact" }).format(
              Number(viewCount)
            )}
          </h2>
        </div>
      </div>

      <div className="relative h-full overflow-hidden pt-[50px]">
        <div className="absolute bottom-[50px] z-10">
          {messages.map((message, index) => {
            const bg = color(message.username, streamer.channel, announcement);
            return (
              <div
                key={index}
                className="my-4 w-fit rounded-babbleSmall py-1 px-4"
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

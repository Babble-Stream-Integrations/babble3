import { useState } from "react";
import TwitchChat from "./twitchChat";
import TwitchViewCount from "./twitchViewCount";
import YoutubeViewCount from "./youtubeViewCount";
import { FaUserAlt } from "react-icons/fa";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import { Announcements, Message, Streamer } from "../../types";
import hexToHSLGradient from "../../common/hexToHSLGradient";
import { AutoTextSize } from "auto-text-size";
import YoutubeChat from "./youtubeChat";
import { Socket } from "socket.io-client";
// import invertColor from "../../common/invertColor";

export default function ChatComponent({
  streamer,
  platform,
  announcements,
  socket,
}: {
  streamer: Streamer;
  platform: string;
  announcements: Announcements;
  messages?: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: Socket;
}) {
  //usestate for chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [liveChatId, setLiveChatId] = useState<string>("");
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
    YoutubeChat({
      streamer,
      liveChatId,
      setLiveChatId,
      messages,
      setMessages,
      socket,
    });

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

  function color(
    name: string,
    announcements: Announcements
    // twitchColor: string
  ) {
    let chatColor =
      "linear-gradient(to right, hsl(240, 5%, 11%) , 1%, hsl(240, 5%, 11%)";
    //check if user is in announcements
    if (
      announcements.mostPointsAmount > 0 &&
      announcements.mostPoints.toLowerCase().includes(name.toLowerCase())
    ) {
      chatColor = hexToHSLGradient("#FDC74C", "right", "1", "darker");
    }

    //check all announcments for names, and give those names a background color in chat
    // Object.values(announcements).forEach((announcement) => {
    //   if (
    //     typeof announcement === "string" &&
    //     announcement !== "" &&
    //     name.toLowerCase().includes(announcement.toLowerCase())
    //   ) {
    //     console.log("announcement", announcement, "name", name);
    //     chatColor = hexToHSLGradient(
    //       invertColor(twitchColor),
    //       "right",
    //       "1",
    //       "darker"
    //     );
    //     return;
    //   }
    // });
    return chatColor;
  }

  return (
    <div className="z-10 h-full w-full overflow-hidden rounded-babble border border-babbleGray bg-babbleLightGray/5 py-4 text-babbleWhite shadow-babbleOuter backdrop-blur-babble  ">
      <div className="z-40 mx-4 flex h-[50px] items-center justify-between rounded-babbleSmall bg-gradient-to-tr from-platformDark to-platformLight px-[10%] ">
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
        <div className="absolute bottom-[50px] w-full px-4">
          {messages.map((message, index) => {
            const bg = color(
              message.username,
              announcements
              // message.color ? message.color : "000000"
            );
            return (
              <div
                key={index}
                className="z-20 my-4 w-fit whitespace-pre-wrap rounded-babbleSmall px-4 py-1 shadow-babble"
                style={{
                  backgroundImage: bg,
                  //if color is black show message in white
                  color: bg === "black" ? message.color : "babbleWhite",
                }}
              >
                <span
                  className="w-full font-bold"
                  //if bg isnt  "linear-gradient(to right, hsl(240, 5%, 11%) , 1%, hsl(240, 5%, 11%)", show message in white
                  style={{
                    color:
                      bg ===
                      "linear-gradient(to right, hsl(42,98%,65%) , 1%, hsl(42,98%,45%))"
                        ? "babbleWhite"
                        : "babbleWhite",
                  }}
                  dangerouslySetInnerHTML={{ __html: message.displayname }}
                />
                :{" "}
                <span
                  className="w-full max-w-full break-words text-babbleWhite"
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

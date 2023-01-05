import { useState } from "react";
import { motion } from "framer-motion";
import { AutoTextSize } from "auto-text-size";
import { FaUserAlt } from "react-icons/fa";
import { ImTwitch, ImYoutube } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import hexToHSLGradient from "common/hexToHSLGradient";
import TwitchChat from "./twitchChat";
import TwitchViewCount from "./twitchViewCount";
import YoutubeChat from "./youtubeChat";
import YoutubeViewCount from "./youtubeViewCount";
import type { Announcements, Message, Streamer } from "types";
import type { Socket } from "socket.io-client";

export default function ChatComponent({
  streamer,
  announcements,
  socket,
}: {
  streamer: Streamer;
  announcements: Announcements;
  socket?: Socket;
}) {
  //usestate for chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  //usestate for viewcount
  const [viewCount, setViewCount] = useState<string>("");
  const Icon = () => {
    switch (streamer.platform) {
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

  if (streamer.platform === "twitch") {
    TwitchChat({ streamer: streamer, messages, setMessages });
    TwitchViewCount({
      streamer: streamer,
      setViewCount,
    });
  } else if (streamer.platform === "youtube") {
    YoutubeChat({ streamer: streamer, messages, setMessages, socket });
    YoutubeViewCount({
      streamer: streamer,
      setViewCount,
    });
  } else if (streamer.platform === "tiktok") {
    TwitchChat({ streamer: streamer, messages, setMessages });
    TwitchViewCount({
      streamer: streamer,
      setViewCount,
    });
  }
  //give the backgrount a gradient if user is in announcements
  function color(name: string, announcements: Announcements) {
    if (name === "" || name === undefined || name === null) return;
    let chatColor =
      "linear-gradient(to right, hsl(240, 5%, 11%) , 1%, hsl(240, 5%, 11%)";
    //check if user is in the announcements
    if (
      announcements.mostPointsAmount > 0 &&
      announcements.mostPoints !== null &&
      announcements.mostPoints.toLowerCase().includes(name.toLowerCase())
    ) {
      chatColor = hexToHSLGradient("#FDC74C", "left", "1", "darker");
      return chatColor;
    } else if (
      announcements.onStreakAmount > 2 &&
      announcements.onStreak !== null &&
      announcements.onStreak.toLowerCase().includes(name.toLowerCase())
    ) {
      chatColor = hexToHSLGradient("#FF2E2E", "left", "1", "darker");
      return chatColor;
      // } else if (
      //   // announcements.onComebackAmount > 3 &&
      //   // announcements.onComeback.toLowerCase().includes(name.toLowerCase())
      // ) {
      //   chatColor = hexToHSLGradient("#39EF39", "left", "1", "darker");
      //   return chatColor;
      // } else if (
      //     // announcements.isFrozen.toLowerCase().includes(name.toLowerCase())
      // ) {
      //   chatColor = hexToHSLGradient("#4DDAFE", "left", "1", "darker");
      //   return chatColor;
    } else if (
      announcements.firstToGuess !== null &&
      announcements.firstToGuess.toLowerCase().includes(name.toLowerCase())
    ) {
      chatColor = hexToHSLGradient("#9146FF", "left", "1", "darker");
      return chatColor;
    }
    return chatColor;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.1,
      }}
      transition={{
        duration: 0.5,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      className="z-10 h-full w-full overflow-hidden rounded-babble border border-babbleGray bg-babbleLightGray/5 py-4 text-babbleWhite shadow-babbleOuter backdrop-blur-babble  "
      data-theme={streamer.platform}
    >
      <div className="z-40 mx-4 flex h-[50px] items-center justify-between rounded-babbleSmall bg-gradient-to-tr from-platformDark to-platformLight px-[10%] ">
        <div className="relative flex items-center justify-end gap-0.5 text-[18px] font-normal uppercase">
          <Icon />
          <div className="w-max pl-2 pr-4 text-left">
            <AutoTextSize
              dangerouslySetInnerHTML={{ __html: streamer.username }}
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
            const bg = color(message.username, announcements);
            return (
              <div
                key={index}
                className="z-20 my-4 flex w-fit whitespace-pre-wrap rounded-babbleSmall px-4 py-1 shadow-babble"
                style={{
                  backgroundImage: bg,
                  //if bg is not linear-gradient(to right, rgb(27, 27, 29), 1%, rgb(27, 27, 29))
                  //then set text color to white
                  color:
                    bg !==
                    "linear-gradient(to right, hsl(240, 5%, 11%) , 1%, hsl(240, 5%, 11%)"
                      ? "white"
                      : message.color,
                }}
              >
                {message.image && (
                  <img
                    className="my-1 mr-4 h-6 w-6 rounded-full"
                    src={message.image}
                    alt={message.displayname}
                  />
                )}
                <div>
                  <span
                    className="w-full font-bold"
                    dangerouslySetInnerHTML={{ __html: message.displayname }}
                  />
                  :{" "}
                  <span
                    className="w-full max-w-fit text-babbleWhite [overflow-wrap:anywhere]"
                    dangerouslySetInnerHTML={{ __html: message.message }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

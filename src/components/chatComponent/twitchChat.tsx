import React, { useEffect } from "react";
import tmi from "tmi.js";
import { parseBadges, parseEmotes } from "emotettv";
import { Message } from "../../pages/quiz";

interface Props {
  streamer: {
    name: string;
    id: string;
    platform: string;
  };
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
export default function TwitchChat({ streamer, messages, setMessages }: Props) {
  //get username color if not set
  const default_colors = [
    ["Red", "#FF0000"],
    ["Blue", "#0000FF"],
    ["Green", "#00FF00"],
    ["FireBrick", "#B22222"],
    ["Coral", "#FF7F50"],
    ["YellowGreen", "#9ACD32"],
    ["OrangeRed", "#FF4500"],
    ["SeaGreen", "#2E8B57"],
    ["GoldenRod", "#DAA520"],
    ["Chocolate", "#D2691E"],
    ["CadetBlue", "#5F9EA0"],
    ["DodgerBlue", "#1E90FF"],
    ["HotPink", "#FF69B4"],
    ["BlueViolet", "#8A2BE2"],
    ["SpringGreen", "#00FF7F"],
  ];
  function Color(name: string | undefined, color: string | undefined) {
    if (color) {
      console.log(color);
      color === "#000000" ? (color = "#808080") : color;
      return color;
    }
    if (name === undefined) {
      return default_colors[
        Math.floor(Math.random() * default_colors.length)
      ][1];
    } else {
      const n = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
      const color = default_colors[n % default_colors.length][1];
      return color;
    }
  }

  //connect to twitch chat
  const channelId = streamer.id;
  const client = new tmi.Client({
    channels: [streamer.name],
  });
  useEffect(() => {
    client.connect();

    const options = {
      channelId,
    };

    //add new message to messages, parse emotes and badgers
    client.on("message", async (_channel, tags, message) => {
      const parsedMessage = await parseEmotes(message, tags.emotes, options);
      const parsedBadges = await parseBadges(tags.badges as never, options);
      const htmlMessage = parsedMessage.toHtml();
      const htmlBadges = parsedBadges.toHtml();
      const color = Color(tags["display-name"], tags["color"]);
      const newMessage = {
        username: `${htmlBadges} ${tags["display-name"]}`,
        message: `${htmlMessage}`,
        color: color,
      };
      setMessages((messages) => [...messages, newMessage]);
    });
  }, []);

  //remove first message if there are more than 30 messages
  useEffect(() => {
    if (messages.length > 38) {
      setMessages((messages) => messages.slice(1));
    }
  }, [messages]);
}

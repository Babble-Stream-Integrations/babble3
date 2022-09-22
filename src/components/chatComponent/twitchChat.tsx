import React, { useEffect } from "react";
import { Client } from "tmi.js";
import { formatEmotes } from "./emotes";

//configuring
interface Props {
  streamer: {
    name: string;
    id: string;
    platform: string;
  };
  messages: message[];
  setMessages: React.Dispatch<React.SetStateAction<any>>;
}
type message = {
  username: string | undefined;
  message: string;
  color: string | undefined;
};
export default function TwitchChat({ streamer, messages, setMessages }: Props) {
  type message = {
    username: string | undefined;
    message: string;
    color: string | undefined;
  };

  //connect to twitch chat
  const client = new Client({
    channels: [streamer.name],
  });
  useEffect(() => {
    client.connect();

    //add new message to messages, parse emotes
    client.on("message", (_channel, tags, message) => {
      const newMessage: message = {
        username: tags["display-name"],
        message: formatEmotes(message, tags.emotes),
        color: tags.color,
      };
      setMessages((messages: never) => [...messages, newMessage]);
    });
  }, []);

  //remove first message if there are more than 30 messages
  useEffect(() => {
    if (messages.length > 30) {
      setMessages((messages: string | unknown[]) => messages.slice(1));
    }
  }, [messages]);

  return;
}

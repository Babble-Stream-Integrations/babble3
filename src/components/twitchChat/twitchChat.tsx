import React, { useState, useEffect } from "react";
import { Client } from "tmi.js";
import { formatEmotes } from "./emotes";
export default function TwitchChat(props: { streamer: { name: string } }) {
  //show last 10 chat messages
  const [messages, setMessages] = useState<any[]>([]);
  type message = {
    username: string | undefined;
    message: string;
    color: string | undefined;
  };
  //twitch chat client
  const client = new Client({
    channels: [props.streamer.name],
  });
  useEffect(() => {
    client.connect();

    client.on("message", (_channel, tags, message) => {
      const newMessage: message = {
        username: tags["display-name"],
        message: formatEmotes(message, tags.emotes),
        color: tags.color,
      };
      setMessages((messages) => [...messages, newMessage]);
    });
  }, []);

  //remove first message if more than 30 messages
  useEffect(() => {
    if (messages.length > 30) {
      setMessages((messages) => messages.slice(1));
    }
  }, [messages]);

  return (
    <div className="w-72 overflow-hidden rounded-xl bg-babbleDarkgray pb-2">
      <div className="inline-block h-[80vh] w-72 overflow-hidden text-ellipsis rounded-xl bg-babbleDarkgray text-white">
        <div className="mb-2 flex justify-between bg-gradient-to-tr from-twitchDark to-twitchLight px-4 py-1 ">
          <h1>{props.streamer.name}</h1>
          <h2>10.000.000</h2>
        </div>
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

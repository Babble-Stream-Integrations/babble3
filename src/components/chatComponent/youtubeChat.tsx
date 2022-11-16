import React, { useEffect } from "react";
import { Message, Streamer } from "../../types";
import { io, Socket } from "socket.io-client";

type Props = {
  streamer: Streamer;
  liveChatId: string;
  setLiveChatId: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: Socket;
};
export default function YoutubeChat({
  streamer,
  liveChatId,
  setLiveChatId,
  messages,
  setMessages,
  socket,
}: Props) {
  // const url = `https://europe-west1-babble-d6ef3.cloudfunctions.net/default/youtube/livechat/${streamer.channel}`;
  const url = `http://localhost:5001/babble-d6ef3/europe-west1/default/youtube/livechat/${streamer.channel}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLiveChatId(data.liveChatId);
      });
  }, []);

  useEffect(() => {
    if (liveChatId !== "") {
      socket.emit("youtube-livechat-start", liveChatId);
      socket.on("youtube-livechat-message", (message: Message) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  }, [liveChatId]);

  console.warn(messages, streamer);
  console.warn(setMessages, liveChatId);
  return;
}

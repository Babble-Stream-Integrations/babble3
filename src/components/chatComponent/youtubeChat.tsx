import React, { useEffect } from "react";
import { Message, Streamer } from "../../types";
import type { Socket } from "socket.io-client";
import axios from "axios";
import { appConfig } from "../../config/app";

type Props = {
  streamer: Streamer;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: Socket | undefined;
};
export default function YoutubeChat({
  streamer,
  messages,
  setMessages,
  socket,
}: Props) {
  useEffect(() => {
    if (!socket) return;
    axios
      .get(`${appConfig.base}/youtube/livechat/` + streamer.username)
      .then((data) => {
        socket.emit("youtube-livechat-start", {
          liveChatId: data.data.liveChatId,
        });
      });

    socket.on("message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  //remove first message if there are more than 30 messages
  useEffect(() => {
    if (messages.length > 38) {
      setMessages((messages) => messages.slice(1));
    }
  }, [messages]);
}

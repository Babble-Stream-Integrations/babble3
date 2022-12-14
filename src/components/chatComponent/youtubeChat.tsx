import React, { useEffect } from "react";
import { Message, Streamer } from "../../types";
import { io, Socket } from "socket.io-client";
import { appConfig } from "../../config/app";
import axios from "axios";

type Props = {
  streamer: Streamer;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};
export default function YoutubeChat({
  streamer,
  messages,
  setMessages,
}: Props) {
  useEffect(() => {
    const client: Socket = io(appConfig.backendUrl);
    axios
      .get(
        "https://europe-west1-babble-d6ef3.cloudfunctions.net/default/youtube/livechat/" +
          streamer.channel
      )
      .then((data) => {
        client.emit("youtube-livechat-start", {
          liveChatId: data.data.liveChatId,
        });
      });

    client.on("message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });
  }, []);

  //remove first message if there are more than 30 messages
  useEffect(() => {
    if (messages.length > 38) {
      setMessages((messages) => messages.slice(1));
    }
  }, [messages]);
}

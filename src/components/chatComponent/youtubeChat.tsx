import React, { useEffect } from "react";
import axios from "axios";
import { Message, Streamer } from "../../types";

type Props = {
  liveChatId: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};
export default function YoutubeChat({
  liveChatId,
  messages,
  setMessages,
}: Props) {
  console.log(liveChatId);
  console.log(messages);
  console.log(setMessages);
  return;
}
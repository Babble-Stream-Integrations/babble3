import React, { useEffect } from "react";
import axios from "axios";
import { Streamer } from "../../pages/quiz";

type Props = {
  streamer: Streamer;
  setViewCount: React.Dispatch<React.SetStateAction<string>>;
};

export default async function TwitchViewCount({
  streamer,
  setViewCount,
}: Props) {
  const url = `https://europe-west1-babble-d6ef3.cloudfunctions.net/default/view-count/${streamer.name}`;
  //first call
  useEffect(() => {
    setTimeout(async () => {
      const res = await axios.get(url);
      setViewCount(res.data.count.toString());
    }, 1000);
  }, []);
  //repeat call every 30 seconds
  useEffect(() => {
    setTimeout(() => {
      setInterval(async () => {
        const res = await axios.get(url);
        setViewCount(res.data.count.toString());
      }, 30000);
    }, 1000);
  }, []);

  return;
}

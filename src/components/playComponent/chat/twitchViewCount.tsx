import { useEffect } from "react";
import axios from "axios";
import { appConfig } from "config/app";
import type { Streamer } from "types";

type Props = {
  streamer: Streamer;
  setViewCount: React.Dispatch<React.SetStateAction<string>>;
};

export default async function TwitchViewCount({
  streamer,
  setViewCount,
}: Props) {
  const url = `${appConfig.base}/view-count/twitch/${decodeURIComponent(
    streamer.username
  )}`;
  //get viewCount
  useEffect(() => {
    //retrieve viewCount for the first time and check if online. if not online stop the function
    setTimeout(async () => {
      try {
        const res = await axios.get(url);
        setViewCount(res.data.count.toString());
      } catch (error) {
        clearInterval(interval);
        setViewCount("0");
      }
    }, 1000);
    //repeat call every 30 seconds
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(url);
        setViewCount(res.data.count.toString());
      } catch (error) {
        clearInterval(interval);
      }
    }, 30000);
  }, []);

  return;
}

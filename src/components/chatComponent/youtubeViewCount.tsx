import React, { useEffect } from "react";
import axios from "axios";
import { Streamer } from "../../pages/quiz/quiz";

type Props = {
  streamer: Streamer;
  setViewCount: React.Dispatch<React.SetStateAction<string>>;
  setLiveChatId: React.Dispatch<React.SetStateAction<string>>;
};

export default async function YoutubeViewCount({
  streamer,
  setViewCount,
  setLiveChatId,
}: Props) {
  const url = `https://europe-west1-babble-d6ef3.cloudfunctions.net/default/youtube/viewcount/${streamer.name}`;
  //get viewCount

  useEffect(() => {
    //retrieve viewCount for the first time and check if online. if not online stop the function
    setTimeout(async () => {
      try {
        const res = await axios.get(url);
        setViewCount(res.data.count.toString());
        setLiveChatId(res.data.liveChatId);
        console.log(res.data.videoId);
      } catch (error) {
        // clearInterval(interval);
        setViewCount("Offline");
      }
    }, 1000);
    //repeat call every 30 seconds
    // const interval = setInterval(async () => {
    //   try {
    //     // const res = await axios.get(efficientUrl);
    //     // setViewCount(res.data.count.toString());
    //   } catch (error) {
    //     clearInterval(interval);
    //     setViewCount("Offline");
    //   }
    // }, 30000);
  }, []);
}

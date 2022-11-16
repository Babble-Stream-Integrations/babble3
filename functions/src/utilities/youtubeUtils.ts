import axios from "axios";
import { youtubeConfig } from "../config/youtube";

export async function getLiveInfo(channel: string) {
  const channelId = await axios({
    method: "GET",
    url: `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=1&q=${channel}&type=channel&key=${youtubeConfig.apiKey}`,
  }).then((data) => data.data.items[0].id.channelId);
  const videoId = await axios({
    method: "GET",
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${youtubeConfig.apiKey}`,
  }).then((data) => data.data.items[0].id.videoId);
  const { concurrentViewers, liveChatId } = await axios({
    method: "GET",
    url: `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeConfig.apiKey}&part=liveStreamingDetails`,
  }).then((data) => {
    return {
      concurrentViewers:
        data.data.items[0].liveStreamingDetails.concurrentViewers,
      liveChatId: data.data.items[0].liveStreamingDetails.activeLiveChatId,
    };
  });
  return { concurrentViewers: concurrentViewers, liveChatId: liveChatId };
}

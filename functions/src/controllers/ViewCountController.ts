import axios from "axios";
import { helixConfig } from "../config/twitch";
import { youtubeConfig } from "../config/youtube";

// class ViewCountController {
//   public path = "/livechat";
//   public router = express.Router();

//   constructor() {
//     this.initializeRoutes();
//   }

//   public initializeRoutes() {
//     this.router.get(
//       this.path + "/:platform(twitch|youtube)",
//       this.getViewCount
//     );
//   }

//   getViewCount = (request: express.Request, response: express.Response) => {
//     response.send("");
//   };
// }

export async function getViewCount(channel: string, platform: string) {
  if (platform === "twitch") {
    const result = await axios
      .get(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
        headers: {
          Authorization: helixConfig.token,
          "Client-Id": helixConfig.clientId,
        },
      })
      .then((response) => response.data.data[0].viewer_count);
    return result;
  } else if (platform === "youtube") {
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
    console.log(liveChatId);
    return concurrentViewers;
  }
}
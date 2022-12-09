import axios from "axios";
import { helixConfig } from "../config/twitch";
import { fetchLiveDetails } from "../utilities/youtubeUtils";

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
    try {
      const result = await axios.get(
        `https://api.twitch.tv/helix/streams?user_login=${channel}`,
        {
          headers: {
            Authorization: helixConfig.token,
            "Client-Id": helixConfig.clientId,
          },
        }
      );
      return typeof result.data.data[0] !== "undefined"
        ? result.data.data[0].viewer_count
        : 0;
    } catch (error) {
      console.log(error);
      return 0;
    }
  } else if (platform === "youtube") {
    const data = await fetchLiveDetails(channel);
    return data.concurrentViewers;
  }
}

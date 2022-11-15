import axios from "axios";
import { helixConfig } from "../config/twitch";
import { getLiveInfo } from "../utilities/youtubeUtils";

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
    return getLiveInfo(channel).then(response => response.concurrentViewers);
  }
}

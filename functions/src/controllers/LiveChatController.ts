import { getLiveInfo } from "../utilities/youtubeUtils";

export async function getLiveChatId(channel: string) {
  return getLiveInfo(channel).then((response) => response.liveChatId);
}

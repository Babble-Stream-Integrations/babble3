import { fetchLiveDetails } from "../utilities/youtubeUtils";

export async function getLiveChatId(channel: string) {
  const liveDetails = await fetchLiveDetails(channel);
  return liveDetails.liveChatId;
}

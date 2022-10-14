import axios from "axios";
import * as express from "express";
import { youtubeConfig } from "../config/youtube.js";

const router = express.Router();

router.get("/viewcount/:broadcaster", (req, res) => {
  //get channel Id
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=1&q=${req.params.broadcaster}&type=channel&key=${youtubeConfig.apiKey}`
    )
    .then((response) => {
      console.log(response.data);
      const channelId = response.data.items[0].id.channelId;
      //get video Id
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${youtubeConfig.apiKey}&`
        )
        .then((response) => {
          const videoId = response.data.items[0].id.videoId;
          //get viewerCount and LiveChatId
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeConfig.apiKey}&part=liveStreamingDetails`
            )
            .then((response) => {
              const viewerCount =
                response.data.items[0].liveStreamingDetails.concurrentViewers;
              const liveChatId =
                response.data.items[0].liveStreamingDetails.activeLiveChatId;
              res.set("Access-Control-Allow-Origin", "*");
              res.json({
                count: viewerCount,
                liveChatId: liveChatId,
                videoId: videoId,
              });
            });
        });
    });
});

router.get("/efficientviewcount/:videoId", (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?id=${req.params.videoId}&key=${youtubeConfig.apiKey}&part=liveStreamingDetails`
    )
    .then((response) => {
      const viewerCount =
        response.data.items[0].liveStreamingDetails.concurrentViewers;
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        count: viewerCount,
      });
    });
});

export default router;

// axios
//   .get(
//     `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${chatId}&part=snippet%2CauthorDetails&key=${youtubeConfig.apiKey}&maxResults=5`
//   )
//   .then((response) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.json({
//       count: viewerCount,
//       messages: [
//         {
//           profile:
//             response.data.items[0].authorDetails.profileImageUrl,
//         },
//         {
//           name: response.data.items[0].authorDetails.displayName,
//         },
//         {
//           message: response.data.items[0].snippet.displayMessage,
//         },
//       ],
//     });
//   })

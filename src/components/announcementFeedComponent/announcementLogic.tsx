import React, { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa";
import { IoSpeedometerSharp } from "react-icons/io5";
import { Announcements } from "../../types";
import { FeedList } from "../../types";

export default function AnnouncementLogic({
  announcements,
  setFeedList,
}: {
  announcements: Announcements;
  setFeedList: React.Dispatch<React.SetStateAction<FeedList[]>>;
}) {
  console.log(setFeedList);
  const [localFeed, setLocalFeed] = useState<FeedList[]>([]);
  useEffect(() => {
    for (const [key, value] of Object.entries(announcements)) {
      if (typeof value === "string") {
        const announcement = {
          type: key,
          name: value,
          icon: <></>,
          title: "",
          value: 0,
          startColor: "",
          endColor: "",
          key: "",
        };
        switch (announcement.type) {
          case "mostPoints":
            //check if the value is not empty
            if (announcements.mostPoints !== "") {
              announcement.icon = (
                <FaTrophy
                  style={{ fill: `url(#gradient-${announcement.type})` }}
                />
              );
              announcement.title = "Leading";
              announcement.value = announcements.mostPointsAmount;
              announcement.startColor = "#FDC74C";
              announcement.endColor = "#A47200";
              announcement.key =
                announcement.type + announcement.name + announcement.value;
              //wait 1 second before adding a new announcement, check if the announcement is already in the list
              setLocalFeed((localFeed: FeedList[]) => {
                return [...localFeed, announcement];
              });
            }
            break;
          case "onStreak":
            if (
              announcements.onStreak !== "" &&
              announcements.onStreakAmount > 2
            ) {
              announcement.icon = (
                <AiFillFire
                  style={{ fill: `url(#gradient-${announcement.type})` }}
                />
              );
              announcement.title = "Streak";
              announcement.value = announcements.onStreakAmount;
              announcement.startColor = "#FF2E2E";
              announcement.endColor = "#B50B0B";
              announcement.key =
                announcement.type + announcement.name + announcement.value;
              //wait 2 seconds before adding a new announcement
              setLocalFeed((localFeed: FeedList[]) => {
                return [...localFeed, announcement];
              });
            }
            break;
          case "firstToGuess":
            if (announcements.firstToGuess !== "") {
              announcement.icon = (
                <IoSpeedometerSharp
                  style={{ fill: `url(#gradient-${announcement.type})` }}
                />
              );
              announcement.title = "First";
              announcement.startColor = "#9146FF";
              announcement.endColor = "#4503A8";
              announcement.key = announcement.type + announcement.name;
              setLocalFeed((localFeed: FeedList[]) => {
                return [...localFeed, announcement];
              });
            }
            break;
        }
      }
    }
  }, [announcements]);
  //set the local feed to the global feed. one by one with a 1 second delay
  useEffect(() => {
    if (localFeed.length > 0) {
      setTimeout(() => {
        setFeedList((feedList: FeedList[]) => {
          return [...feedList, localFeed[0]];
        });
        setLocalFeed((localFeed: FeedList[]) => {
          return localFeed.slice(1);
        });
      }, 1000);
    }
  }, [localFeed]);
}

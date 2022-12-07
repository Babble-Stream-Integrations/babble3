import { Announcements } from "../../types";
import { useEffect, useState } from "react";
import IconGradient from "../../common/iconGradient";
import AnnouncementLogic from "./announcementLogic";
import { FeedList } from "../../types";

export default function AnnouncementFeedComponent({
  announcements,
}: {
  announcements: Announcements;
}) {
  const [feedList, setFeedList] = useState<FeedList[]>([]);
  AnnouncementLogic({ announcements, setFeedList });

  useEffect(() => {
    //remove the first item in the list after there are 3 items in the list
    if (feedList.length > 3) {
      setFeedList((feedList: FeedList[]) => {
        feedList.shift();
        return [...feedList];
      });
    }
  }, [feedList]);

  //loop through the announcements, if the announcement is a string, add it to the list.
  return (
    <div className="h-full w-full rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-babbleWhite shadow-babbleOuter backdrop-blur-babble">
      {feedList.length <= 0 ? (
        <div className="flex h-full items-center justify-center">
          <h2 className="text-babbleGray">NO ANNOUNCEMENTS YET</h2>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-evenly gap-3">
          {feedList
            .slice(0)
            .reverse()
            .map((announcement: FeedList) => {
              console.log(announcement);

              const key = Math.random();
              return (
                <div
                  key={key}
                  className="flex h-1/3 max-h-[80px] w-full items-center justify-between rounded-babble bg-babbleDarkerGray py-2 px-5"
                >
                  {IconGradient(
                    announcement.type,
                    announcement.startColor,
                    announcement.endColor,
                    [0, 50, 100, 50]
                  )}
                  <div className="text-2xl">{announcement.icon}</div>
                  <div className="flex ">
                    <h2>{announcement.title} </h2>
                    <h2 className="w-2">&nbsp;</h2>
                    <h2 className=" font-extralight">{announcement.name}</h2>
                    <h2 className="w-2">&nbsp;</h2>
                    {announcement.value > 0 && (
                      <h2 className=" font-extralight">{announcement.value}</h2>
                    )}
                  </div>
                  <div className="text-2xl">{announcement.icon}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
// useEffect(() => {
//   for (const [key, value] of Object.entries(announcements)) {
//     if (typeof value === "string") {
//       const announcement = {
//         type: key,
//         name: value,
//         icon: <></>,
//         title: "",
//         value: 0,
//       };
//       switch (announcement.type) {
//         case "mostPoints":
//           announcement.icon = <FaTrophy />;
//           announcement.title = "Most Points";
//           announcement.value = announcements.mostPointsAmount;
//           break;
//         case "onStreak":
//           announcement.icon = <IoSpeedometerSharp />;
//           announcement.title = "On Streak";
//           break;
//         case "firstToGuess":
//           announcement.icon = <AiFillFire />;
//           announcement.title = "First To Guess";
//           break;
//       }
//       setFeedList((feedList: any) => [...feedList, announcement]);
//     }
//   }
// }, []);

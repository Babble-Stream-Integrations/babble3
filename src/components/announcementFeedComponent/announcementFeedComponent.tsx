import { FaTrophy } from "react-icons/fa";
import { IoSpeedometerSharp } from "react-icons/io5";
import { AiFillFire } from "react-icons/ai";
import { AutoTextSize } from "auto-text-size";
import { Announcements } from "../../types";

export default function AnnouncementFeedComponent({
  announcements,
}: {
  announcements: Announcements;
}) {
  let streak = 0;
  if (announcements.onStreakAmount > streak) {
    streak = announcements.onStreakAmount;
  } else if (announcements.onStreakAmount <= streak) {
    streak = 0;
  }

  return (
    <div className="h-full w-full rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-3xl text-babbleWhite backdrop-blur-babble">
      <div className="flex h-full items-center justify-between">
        <div className="flex h-full w-full flex-col justify-evenly gap-2">
          <div className="flex h-1/4 w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 shadow-babble">
            <FaTrophy />
            <div className="flex w-5/6 justify-center px-4">
              <AutoTextSize
                maxFontSizePx={18}
                dangerouslySetInnerHTML={{
                  __html: `MOST POINTS: ${
                    announcements.mostPointsAmount > 0
                      ? `${announcements.mostPoints} (${announcements.mostPointsAmount})`
                      : ""
                  }`,
                }}
              />
            </div>
            <FaTrophy />
          </div>
          <div className="flex h-1/4  w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 shadow-babble">
            <IoSpeedometerSharp />
            <div className="flex w-5/6 justify-center px-4">
              <AutoTextSize
                maxFontSizePx={18}
                dangerouslySetInnerHTML={{
                  __html: `FIRST: ${
                    announcements.firstToGuess ? announcements.firstToGuess : ""
                  }`,
                }}
              />
            </div>
            <IoSpeedometerSharp />
          </div>
          <div className="flex h-1/4  w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 shadow-babble">
            <div className="relative flex items-center">
              <AiFillFire className="absolute" />
              <h3 className="absolute left-3  pt-2 text-[10px] text-babbleDarkerGray">
                {streak}
              </h3>
            </div>
            <div className="flex w-5/6 justify-center px-4">
              <AutoTextSize
                maxFontSizePx={18}
                dangerouslySetInnerHTML={{
                  __html: `STREAK: ${streak > 1 ? announcements.onStreak : ""}`,
                }}
              />
            </div>
            <div className="relative flex items-center ">
              <AiFillFire className="absolute right-0" />
              <h3 className="absolute right-3 pt-2 text-[10px] text-babbleDarkerGray">
                {streak}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

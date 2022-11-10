import { FaTrophy } from "react-icons/fa";
import { IoSpeedometerSharp } from "react-icons/io5";
import { AiFillFire } from "react-icons/ai";

type AnnouncementFeed = {
  mostPoints: string;
  firstToGuess: string;
  onStreak: string;
  mostPointsAmount: number;
  onStreakAmount: number;
};
export default function AnnouncementFeedComponent({
  announcements,
}: {
  announcements: AnnouncementFeed;
}) {
  return (
    <div className="h-full w-full rounded-babble border border-babbleGray bg-babbleLightGray/5 p-4 text-3xl text-babbleWhite shadow-babbleOuter backdrop-blur-babble">
      <div className="flex h-full items-center justify-between">
        <div className="flex h-full w-full flex-col justify-evenly gap-2">
          <div className="flex h-1/4 w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 shadow-babble">
            <FaTrophy />
            <div className="flex">
              <h3 className=" text-lg">MOST POINTS: </h3>
              <h3 className=" text-lg"></h3>
            </div>
            <FaTrophy />
          </div>
          <div className="flex h-1/4  w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 shadow-babble">
            <IoSpeedometerSharp />
            <div className="flex">
              <h3 className=" text-lg">FIRST:</h3>
              <h3 className=" text-lg">{announcements.firstToGuess}</h3>
            </div>
            <IoSpeedometerSharp />
          </div>
          <div className="flex h-1/4  w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 shadow-babble">
            <div className="relative flex items-center">
              <AiFillFire className="absolute" />
              <h3 className="absolute left-3  pt-2 text-[10px] text-babbleDarkerGray">
                {announcements.onStreakAmount}
              </h3>
            </div>
            <div className="flex">
              <h3 className=" text-lg">STREAK:</h3>
              <h3 className=" text-lg">{announcements.onStreak}</h3>
            </div>
            <div className="relative flex items-center ">
              <AiFillFire className="absolute right-0" />
              <h3 className="absolute right-3 pt-2 text-[10px] text-babbleDarkerGray">
                {announcements.onStreakAmount}
              </h3>
            </div>
          </div>
          {/* <div className="flex h-1/4  w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4">
            <FaTrophy />
            <div className="flex">
              <h3 className=" text-lg">MOST POINTS: </h3>
              <h3 className=" text-lg"></h3>
            </div>
            <FaTrophy />
          </div> */}
        </div>
      </div>
    </div>
  );
}

import { FaClock, FaFire, FaTrophy } from "react-icons/fa";
import { IoSpeedometerSharp, IoTimerOutline } from "react-icons/io5";
import { MdSpeed } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";

type firstToGuess = {
  firstToGuess: string;
};
export default function AnnouncementFeedComponent({
  firstToGuess,
}: firstToGuess) {
  return (
    <div className="h-full w-full rounded-babble border border-babbleGray bg-babbleGray/5 p-4 text-3xl text-babbleWhite backdrop-blur-babble">
      <div className="flex h-full items-center justify-between">
        <div className="flex h-full w-full flex-col justify-evenly gap-2">
          <div className="flex h-1/4 w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4">
            <FaTrophy />
            <div className="flex">
              <h3 className=" text-lg">MOST POINTS: </h3>
              <h3 className=" text-lg"></h3>
            </div>
            <FaTrophy />
          </div>
          <div className="flex h-1/4  w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4">
            <IoSpeedometerSharp />
            <div className="flex">
              <h3 className=" text-lg">FIRST:</h3>
              <h3 className=" text-lg">{firstToGuess}</h3>
            </div>
            <IoSpeedometerSharp />
          </div>
          <div className="flex h-1/4  w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4">
            <div className="relative flex items-center">
              <AiFillFire className="absolute" />
              <h3 className="absolute left-3  pt-2 text-[10px] text-babbleDarkerGray">
                2
              </h3>
            </div>
            <div className="flex">
              <h3 className=" text-lg">STREAK:</h3>
              <h3 className=" text-lg"></h3>
            </div>
            <div className="relative flex items-center ">
              <AiFillFire className="absolute right-0" />
              <h3 className="absolute right-3 pt-2 text-[10px] text-babbleDarkerGray">
                2
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

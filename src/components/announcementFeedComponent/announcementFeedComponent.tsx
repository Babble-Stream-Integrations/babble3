import { FaClock, FaFire, FaTrophy } from "react-icons/fa";

type firstToGuess = {
  firstToGuess: string;
};
export default function AnnouncementFeedComponent({
  firstToGuess,
}: firstToGuess) {
  console.log(firstToGuess);
  return (
    <div className="h-full w-[600px] rounded-babble border border-babbleGray bg-babbleGray/5 p-4 text-3xl text-babbleWhite">
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 backdrop-blur-babble">
            <FaTrophy />
            <div className="flex">
              <h3 className=" text-lg">MOST POINTS: </h3>
              <h3 className=" text-lg"> {" Leon"}</h3>
            </div>
            <FaTrophy />
          </div>
          <div className="flex w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 backdrop-blur-babble">
            <FaClock />
            <div className="flex">
              <h3 className=" text-lg">FIRST: </h3>
              <h3 className=" text-lg">{firstToGuess}</h3>
            </div>
            <FaClock />
          </div>
          <div className="flex w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 backdrop-blur-babble">
            <FaFire />
            <div className="flex">
              <h3 className=" text-lg">STREAK: </h3>
              <h3 className=" text-lg"> {" Leon"}</h3>
            </div>
            <FaFire />
          </div>
          <div className="flex w-full items-center justify-between gap-2 rounded-babbleSmall bg-babbleDarkerGray p-4 backdrop-blur-babble">
            <FaTrophy />
            <div className="flex">
              <h3 className=" text-lg">MOST POINTS: </h3>
              <h3 className=" text-lg"> {" Leon"}</h3>
            </div>
            <FaTrophy />
          </div>
        </div>
      </div>
    </div>
  );
}

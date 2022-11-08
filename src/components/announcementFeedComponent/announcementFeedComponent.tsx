type firstToGuess = {
  firstToGuess: string;
};
export default function AnnouncementFeedComponent({
  firstToGuess,
}: firstToGuess) {
  return (
    <div className="h-full w-[600px] rounded-babble border border-babbleGray bg-babbleGray/5 p-4">
      <div className="mb-[15px] flex h-[75px] items-center gap-2 rounded-babbleSmall bg-babbleDarkerGray p-8 text-3xl text-babbleWhite shadow-babble backdrop-blur-babble">
        <h1 className=" whitespace-nowrap text-[20px]">First to Answer:</h1>
        <div className="relative left-6 mr-8 flex h-10 w-full items-center overflow-hidden rounded-full bg-babbleGray/20 pl-4">
          <h1> {firstToGuess}</h1>
        </div>
      </div>
      <div className="mb-[15px] flex h-[75px] items-center gap-2 rounded-babbleSmall bg-babbleDarkerGray p-8 text-3xl text-babbleWhite shadow-babble backdrop-blur-babble">
        <h1 className=" whitespace-nowrap text-[20px]">First to Answer:</h1>
        <div className="relative left-6 mr-8 flex h-10 w-full items-center overflow-hidden rounded-full bg-babbleGray/20 pl-4">
          <h1> {firstToGuess}</h1>
        </div>
      </div>
      <div className="mb-[15px] flex h-[75px] items-center gap-2 rounded-babbleSmall bg-babbleDarkerGray p-8 text-3xl text-babbleWhite shadow-babble backdrop-blur-babble">
        <h1 className=" whitespace-nowrap text-[20px]">First to Answer:</h1>
        <div className="relative left-6 mr-8 flex h-10 w-full items-center overflow-hidden rounded-full bg-babbleGray/20 pl-4">
          <h1> {firstToGuess}</h1>
        </div>
      </div>
      <div className="mb-[15px] flex h-[75px] items-center gap-2 rounded-babbleSmall bg-babbleDarkerGray p-8 text-3xl text-babbleWhite shadow-babble backdrop-blur-babble">
        <h1 className=" whitespace-nowrap text-[20px]">First to Answer:</h1>
        <div className="relative left-6 mr-8 flex h-10 w-full items-center overflow-hidden rounded-full bg-babbleGray/20 pl-4">
          <h1> {firstToGuess}</h1>
        </div>
      </div>
    </div>
  );
}

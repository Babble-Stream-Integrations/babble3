import React, { useEffect } from "react";

type firstToAnswer = {
  firstToAnswer: string;
};
export default function AnnouncementFeedComponent({
  firstToAnswer,
}: firstToAnswer) {
  return (
    <div className="flex items-center gap-2 rounded-babble bg-babbleDarkGray p-8 text-3xl text-babbleWhite">
      <h1 className=" whitespace-nowrap">First to Answer:</h1>
      <div className="relative left-6 mr-8 flex h-10 w-full items-center overflow-hidden rounded-full bg-babbleGray/20 pl-4">
        <h1> {firstToAnswer}</h1>
      </div>
    </div>
  );
}

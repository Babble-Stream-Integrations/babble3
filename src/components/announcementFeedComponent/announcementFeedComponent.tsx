import React, { useEffect } from "react";

type firstToAnswer = {
  firstToAnswer: string;
};
export default function AnnouncementFeedComponent({
  firstToAnswer,
}: firstToAnswer) {
  return (
    <div className="flex items-center gap-2 rounded-babble bg-babbleDarkGray p-8 text-3xl text-babbleWhite">
      <div className="relative left-6 mr-8 flex h-10 w-full items-center overflow-hidden rounded-full bg-babbleGray pl-4">
        <h1>First to Answer: {firstToAnswer}</h1>
      </div>
    </div>
  );
}

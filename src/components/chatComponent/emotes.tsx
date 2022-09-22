//code for finding emote words, and replacing them with images
// (code from https://github.com/tmijs/tmi.js/issues/11)

export function formatEmotes(
  message: string,
  emotes: { [emoteid: string]: string[] } | undefined
) {
  let splitmessage = message.split("");
  for (const i in emotes) {
    const e = emotes[i];
    for (const j in e) {
      let mote = e[j];
      if (typeof mote == "string") {
        mote = mote.split("-") as unknown as string;
        mote = [parseInt(mote[0]), parseInt(mote[1])] as unknown as string;
        const length =
            (mote[1] as unknown as number) - (mote[0] as unknown as number),
          // eslint-disable-next-line prefer-spread
          empty = Array.apply(null, new Array(length + 1)).map(function () {
            return "";
          });
        splitmessage = splitmessage
          .slice(0, mote[0] as unknown as number)
          .concat(empty)
          .concat(
            splitmessage.slice(
              (mote[1] + 1) as unknown as number,
              splitmessage.length
            )
          );
        splitmessage.splice(
          mote[0] as unknown as number,
          1,
          '<img class="inline h-8 w-8 px-1 overflow-visible" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
            i +
            '/1.0"/>'
        );
      }
    }
  }
  return splitmessage.join("");
}

//this function takes the message and the emotes and formats them into html
//the emotes are in the format of {emoteid: [startindex-endindex, startindex-endindex]}
//the message is split into an array of characters
//for each emote in the emotes object
//for each emote in the emotes array
//if the emote is a string
//split the emote into an array of startindex and endindex
//calculate the length of the emote
//create an array of empty strings with the length of the emote
//replace the characters in the message array with the empty array
//insert the emote html into the message array
//return the message array joined into a string

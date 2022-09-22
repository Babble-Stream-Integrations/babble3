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
        const length = (mote[1] as any) - (mote[0] as any),
          // eslint-disable-next-line prefer-spread
          empty = Array.apply(null, new Array(length + 1)).map(function () {
            return "";
          });
        splitmessage = splitmessage
          .slice(0, mote[0] as any)
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
// export function getMessageHTML(message: string, { emotes }: any) {
//   if (!emotes) return message;

//   // store all emote keywords
//   // ! you have to first scan through
//   // the message string and replace later
//   const stringReplacements: { stringToReplace: string; replacement: string }[] =
//     [];

//   // iterate of emotes to access ids and positions
//   Object.entries(emotes).forEach(([id, positions]) => {
//     // use only the first position to find out the emote key word
//     if (typeof positions === "string") {
//       const position = positions[0];
//       const [start, end] = position.split("-");
//       const stringToReplace = message.substring(
//         parseInt(start, 10),
//         parseInt(end, 10) + 1
//       );

//       stringReplacements.push({
//         stringToReplace: stringToReplace,
//         replacement: `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0">`,
//       });
//     }
//   });

//   // generate HTML and replace all emote keywords with image elements
//   const messageHTML = stringReplacements.reduce(
//     (acc, { stringToReplace, replacement }) => {
//       // obs browser doesn't seam to know about replaceAll
//       return acc.split(stringToReplace).join(replacement);
//     },
//     message
//   );

//   return messageHTML;
// }

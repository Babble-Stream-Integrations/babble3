import React, { useEffect } from "react";
type Props = {
  streamer: {
    name: string;
    id: string;
    platform: string;
  };
  setViewCount: React.Dispatch<React.SetStateAction<string>>;
};

export default function TwitchViewCount({ streamer, setViewCount }: Props) {
  const myHeaders = new Headers();
  myHeaders.append("Client-Id", "<CLIENT-ID>");
  myHeaders.append("Authorization", "Bearer <OAUTH-TOKEN>");

  fetch(`https://api.twitch.tv/helix/streams?user_login=${streamer.name}`, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      setViewCount(
        new Intl.NumberFormat("en", { notation: "compact" }).format(
          data.data[0].viewer_count
        )
      );
    });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const interval = setInterval(() => {
      fetch(`https://api.twitch.tv/helix/streams?user_login=${streamer.name}`, {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          setViewCount(
            new Intl.NumberFormat("en", { notation: "compact" }).format(
              data.data[0].viewer_count
            )
          );
        });
    }, 10000);
  }, []);
}
